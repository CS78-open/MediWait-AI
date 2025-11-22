import React from 'react';
import { BookingResult, Priority } from '../types';
import { CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { MOCK_DOCTORS } from '../constants';

interface SimulationListProps {
  results: BookingResult[];
}

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const colors = {
    [Priority.U]: 'bg-red-100 text-red-800 border-red-200',
    [Priority.B]: 'bg-orange-100 text-orange-800 border-orange-200',
    [Priority.D]: 'bg-blue-100 text-blue-800 border-blue-200',
    [Priority.P]: 'bg-green-100 text-green-800 border-green-200',
  };
  const labels = {
    [Priority.U]: 'U (72h)',
    [Priority.B]: 'B (10gg)',
    [Priority.D]: 'D (30/60gg)',
    [Priority.P]: 'P (120gg)',
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${colors[priority]}`}>
      {labels[priority]}
    </span>
  );
};

const SimulationList: React.FC<SimulationListProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
        <p className="text-gray-500">Nessuna simulazione effettuata.</p>
        <p className="text-sm text-gray-400">Avvia una simulazione per vedere i risultati.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Dettaglio Simulazioni</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {results.length} record
        </span>
      </div>
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 font-medium">Stato</th>
              <th className="px-6 py-3 font-medium">Paziente/ID</th>
              <th className="px-6 py-3 font-medium">Specialità</th>
              <th className="px-6 py-3 font-medium">Priorità</th>
              <th className="px-6 py-3 font-medium">Medico/Azienda</th>
              <th className="px-6 py-3 font-medium">Attesa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((res, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                   {res.compliant ? (
                     <div className="flex items-center text-green-600 gap-1">
                       <CheckCircle size={16} /> <span className="text-xs font-medium">OK</span>
                     </div>
                   ) : res.bookedDate ? (
                     <div className="flex items-center text-red-600 gap-1">
                        <AlertCircle size={16} /> <span className="text-xs font-medium">Ritardo</span>
                     </div>
                   ) : (
                     <div className="flex items-center text-gray-400 gap-1">
                        <XCircle size={16} /> <span className="text-xs font-medium">No Slot</span>
                     </div>
                   )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{res.referralId.id}</div>
                  <div className="text-xs text-gray-500">{res.referralId.patientId}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{res.referralId.department}</td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={res.referralId.priority} />
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {res.doctorId ? (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {MOCK_DOCTORS.find(d => d.id === res.doctorId)?.name}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {res.daysWait > 0 ? (
                    <span className={`font-mono font-medium ${!res.compliant ? 'text-red-600' : 'text-gray-700'}`}>
                      {res.daysWait} gg
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                  {res.bookedDate && (
                     <div className="text-[10px] text-gray-400">
                       {new Date(res.bookedDate).toLocaleDateString('it-IT')}
                     </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimulationList;