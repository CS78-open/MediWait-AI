import { GoogleGenAI } from "@google/genai";
import { AiAnalysisResult, BookingResult, SimulationStats } from "../types";

// Initialize the GenAI client
// NOTE: In a production app, this should be proxyied through a backend to protect the key.
// For this demo, we assume the environment variable is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAnalysisReport = async (
  stats: SimulationStats,
  failedBookings: BookingResult[],
  departmentStats: Record<string, { total: number; avgWait: number }>
): Promise<AiAnalysisResult> => {
  
  if (!process.env.API_KEY) {
    return {
      summary: "API Key non trovata. Impossibile generare report AI.",
      bottlenecks: [],
      recommendations: []
    };
  }

  const prompt = `
    Agisci come un esperto analista di gestione sanitaria. Analizza i seguenti dati simulati dal sistema CUP (Centro Unico di Prenotazione).
    
    Statistiche Generali:
    - Totale Richieste: ${stats.totalReferrals}
    - Prenotazioni conformi ai tempi: ${stats.compliantCount}
    - Tempo medio di attesa: ${stats.avgWaitDays.toFixed(1)} giorni
    - Agende chiuse riscontrate: ${stats.closedAgendas}

    Dettagli per Reparto (Attesa Media):
    ${JSON.stringify(departmentStats, null, 2)}

    Esempi di fallimenti o ritardi gravi:
    ${JSON.stringify(failedBookings.slice(0, 5).map(b => ({
      dept: b.referralId.department,
      priority: b.referralId.priority,
      daysWait: b.daysWait,
      notes: b.notes
    })), null, 2)}

    Genera un report JSON strutturato con:
    1. "summary": Un breve paragrafo riassuntivo della situazione (max 50 parole).
    2. "bottlenecks": Una lista di stringhe che identificano i problemi critici (es. "Cardiologia ha tempi troppo lunghi per priorità B").
    3. "recommendations": Una lista di azioni correttive suggerite per la direzione sanitaria.

    Rispondi SOLO con un oggetto JSON valido.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AiAnalysisResult;

  } catch (error) {
    console.error("Error generating AI report:", error);
    return {
      summary: "Errore durante l'analisi AI.",
      bottlenecks: ["Errore connessione API"],
      recommendations: ["Verificare configurazione API Key"]
    };
  }
};
