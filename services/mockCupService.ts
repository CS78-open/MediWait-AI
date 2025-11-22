import { Referral, Doctor, BookingResult, Priority, Department } from '../types';
import { MOCK_DOCTORS, MAX_WAIT_DAYS } from '../constants';

// Helper to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Simulate generating random referrals
export const generateReferrals = (count: number): Referral[] => {
  const referrals: Referral[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const dept = Object.values(Department)[Math.floor(Math.random() * Object.values(Department).length)];
    const prioKeys = Object.keys(Priority) as Priority[];
    const prio = prioKeys[Math.floor(Math.random() * prioKeys.length)];
    
    referrals.push({
      id: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      patientId: `PAT-${Math.floor(Math.random() * 10000)}`,
      department: dept,
      priority: prio,
      issueDate: now.toISOString(),
      description: `Visita specialistica ${dept} - Controllo`,
    });
  }
  return referrals;
};

// Simulate the booking process for a single referral against available doctors
export const simulateBooking = (referral: Referral, doctors: Doctor[]): BookingResult => {
  // Filter doctors by department
  const eligibleDoctors = doctors.filter(d => d.department === referral.department);
  
  if (eligibleDoctors.length === 0) {
    return {
      referralId: referral,
      doctorId: null,
      bookedDate: null,
      daysWait: 0,
      compliant: false,
      notes: 'Nessun medico disponibile per questa specialità.'
    };
  }

  // Find the best slot
  // Logic: Randomly assign a "next available slot" for each doctor based on how busy they "usually" are
  // In a real app, this would query a DB. Here we simulate the slot finding.
  
  let bestSlot: Date | null = null;
  let bestDoctor: Doctor | null = null;

  // Shuffle doctors to randomize distribution
  const shuffledDoctors = [...eligibleDoctors].sort(() => 0.5 - Math.random());

  for (const doc of shuffledDoctors) {
    if (!doc.agendaOpen) continue;

    // Simulate random availability based on popularity
    // Urgent referrals might find squeezed spots, others wait longer
    const baseWait = Math.floor(Math.random() * 60) + 1; // 1 to 60 days base wait
    const variability = Math.floor(Math.random() * 20);
    
    // Simulate a slot
    const issueDate = new Date(referral.issueDate);
    const slotDate = addDays(issueDate, baseWait + variability);

    if (!bestSlot || slotDate < bestSlot) {
      bestSlot = slotDate;
      bestDoctor = doc;
    }
  }

  if (!bestSlot || !bestDoctor) {
     return {
      referralId: referral,
      doctorId: null,
      bookedDate: null,
      daysWait: 0,
      compliant: false,
      notes: 'Tutte le agende sono chiuse per questa specialità.'
    };
  }

  const issueDate = new Date(referral.issueDate);
  const waitTimeMs = bestSlot.getTime() - issueDate.getTime();
  const daysWait = Math.ceil(waitTimeMs / (1000 * 60 * 60 * 24));
  
  const limit = MAX_WAIT_DAYS[referral.priority];
  const compliant = daysWait <= limit;

  return {
    referralId: referral,
    doctorId: bestDoctor.id,
    bookedDate: bestSlot.toISOString(),
    daysWait,
    compliant,
    notes: compliant ? 'Prenotazione nei tempi previsti.' : `Fuori tempo massimo (Limite: ${limit}gg).`
  };
};
