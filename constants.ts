import { Priority, Department, Doctor } from './types';

export const MAX_WAIT_DAYS = {
  [Priority.U]: 3,
  [Priority.B]: 10,
  [Priority.D]: 30, // Assuming visits, not exams for simplicity
  [Priority.P]: 120,
};

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Rossi', department: Department.CARDIOLOGIA, hospital: 'AO San Camillo', agendaOpen: true, nextAvailableSlot: '' },
  { id: 'd2', name: 'Dr. Bianchi', department: Department.CARDIOLOGIA, hospital: 'Policlinico', agendaOpen: true, nextAvailableSlot: '' },
  { id: 'd3', name: 'Dr. Verdi', department: Department.ORTOPEDIA, hospital: 'AO San Camillo', agendaOpen: false, nextAvailableSlot: '' }, // Closed agenda mock
  { id: 'd4', name: 'Dr. Neri', department: Department.OCULISTICA, hospital: 'Osp. Civile', agendaOpen: true, nextAvailableSlot: '' },
  { id: 'd5', name: 'Dr. Gialli', department: Department.DERMATOLOGIA, hospital: 'Policlinico', agendaOpen: true, nextAvailableSlot: '' },
  { id: 'd6', name: 'Dr. Blu', department: Department.RADIOLOGIA, hospital: 'AO San Camillo', agendaOpen: true, nextAvailableSlot: '' },
  { id: 'd7', name: 'Dr. Viola', department: Department.CARDIOLOGIA, hospital: 'Osp. Civile', agendaOpen: true, nextAvailableSlot: '' },
];

export const DEPARTMENTS_LIST = [
  Department.CARDIOLOGIA,
  Department.ORTOPEDIA,
  Department.OCULISTICA,
  Department.DERMATOLOGIA,
  Department.RADIOLOGIA
];
