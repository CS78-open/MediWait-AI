# MediWait AI - CUP Simulator

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI-orange)

[🇮🇹 Italiano](#italiano) | [🇬🇧 English](#english)

---

<a name="italiano"></a>
## 🇮🇹 Italiano

**MediWait AI** è un'applicazione demo progettata per simulare e analizzare la gestione delle **Liste di Attesa in Sanità** (sistema CUP - Centro Unico di Prenotazione). L'applicazione genera flussi di "impegnative mediche" simulate e tenta di prenotarle presso medici e ambulatori virtuali, verificando il rispetto delle priorità cliniche previste dalla normativa (U, B, D, P).

Il cuore del sistema è l'integrazione con **Google Gemini AI**, che agisce come un auditor intelligente: analizza i dati delle simulazioni, identifica i colli di bottiglia (es. agende chiuse in Cardiologia) e suggerisce azioni correttive alla direzione sanitaria.

### Funzionalità Principali
*   **Simulazione CUP Real-time**: Generazione di richieste per visite specialistiche ed esami diagnostici con diverse priorità.
*   **Verifica Compliance**: Controllo automatico del rispetto dei Tempi di Attesa Massimi (es. Codice U entro 72h, B entro 10gg).
*   **Dashboard Interattiva**: Grafici e statistiche per monitorare il totale delle richieste, la percentuale di conformità e i tempi medi per reparto.
*   **Analisi AI (Gemini)**: Generazione di report qualitativi che spiegano *perché* si verificano ritardi e propongono soluzioni strategiche.
*   **Gestione Agende**: Simulazione di agende aperte/chiuse per diversi medici e aziende ospedaliere.

### Requisiti
*   Node.js & npm
*   Una API Key di Google Gemini (ottenibile su Google AI Studio)

### Installazione e Avvio

1.  Clona il repository:
    ```bash
    git clone https://github.com/tuo-user/mediwait-ai.git
    cd mediwait-ai
    ```

2.  Installa le dipendenze:
    ```bash
    npm install
    ```

3.  Configura la API Key:
    Crea un file `.env` nella root del progetto e aggiungi:
    ```env
    API_KEY=la_tua_chiave_api_qui
    ```
    *Nota: L'app utilizza `process.env.API_KEY`.*

4.  Avvia l'app:
    ```bash
    npm start
    ```

---

<a name="english"></a>
## 🇬🇧 English

**MediWait AI** is a demo application designed to simulate and analyze **Healthcare Waiting List Management** (specifically the Italian CUP system). The app generates simulated flows of medical referrals and attempts to book them with virtual doctors and clinics, verifying compliance with clinical priority regulations (Urgent, Short-term, Deferrable, Programmed).

The core feature is the integration with **Google Gemini AI**, which acts as an intelligent auditor: it analyzes simulation data, identifies bottlenecks (e.g., closed agendas in Cardiology), and suggests corrective actions for healthcare management.

### Key Features
*   **Real-time CUP Simulation**: Generation of requests for specialist visits and diagnostic exams with varying priorities.
*   **Compliance Check**: Automatic verification of Maximum Waiting Times (e.g., Priority U within 72h, B within 10 days).
*   **Interactive Dashboard**: Charts and statistics to monitor total requests, compliance rates, and average waiting times by department.
*   **AI Analysis (Gemini)**: Generation of qualitative reports explaining *why* delays occur and proposing strategic solutions.
*   **Agenda Management**: Simulation of open/closed schedules for different doctors and hospital units.

### Requirements
*   Node.js & npm
*   Google Gemini API Key (available via Google AI Studio)

### Installation and Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-user/mediwait-ai.git
    cd mediwait-ai
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure API Key:
    Create a `.env` file in the project root and add:
    ```env
    API_KEY=your_api_key_here
    ```
    *Note: The app uses `process.env.API_KEY`.*

4.  Start the app:
    ```bash
    npm start
    ```

---

### Disclaimer
This application is a **simulation demo** intended for educational and auditing demonstration purposes. It does not process real patient data. All doctors, patients, and booking slots are generated algorithmically.
