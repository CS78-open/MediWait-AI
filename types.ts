export enum Priority {
  U = 'U', // Urgente (72h)
  B = 'B', // Breve (10gg)
  D = 'D', // Differibile (30/60gg)
  P = 'P'  // Programmata (120gg)
}

export enum Department {
  CARDIOLOGIA = 'Cardiologia',
  ORTOPEDIA = 'Ortopedia',
  OCULISTICA = 'Oculistica',
  DERMATOLOGIA = 'Dermatologia',
  RADIOLOGIA = 'Radiologia'
}

export interface Doctor {
  id: string;
  name: string;
  department: Department;
  hospital: string; // Azienda Ospedaliera
  agendaOpen: boolean;
  nextAvailableSlot: string; // ISO Date string
}

export interface Referral {
  id: string;
  patientId: string;
  department: Department;
  priority: Priority;
  issueDate: string; // ISO Date string
  description: string;
}

export interface BookingResult {
  referralId: Referral;
  doctorId: string | null;
  bookedDate: string | null; // ISO Date string
  daysWait: number;
  compliant: boolean;
  notes: string;
}

export interface SimulationStats {
  totalReferrals: number;
  compliantCount: number;
  avgWaitDays: number;
  closedAgendas: number;
}

export interface AiAnalysisResult {
  summary: string;
  bottlenecks: string[];
  recommendations: string[];
}
