import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SimulationStats, BookingResult } from '../types';

interface DashboardProps {
  results: BookingResult[];
  stats: SimulationStats;
}

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6'];

const Dashboard: React.FC<DashboardProps> = ({ results, stats }) => {
  // Prepare data for charts
  const complianceData = [
    { name: 'Conformi', value: stats.compliantCount },
    { name: 'Non Conformi', value: stats.totalReferrals - stats.compliantCount },
  ];

  // Average wait by department
  const deptMap = new Map<string, { totalWait: number; count: number }>();
  results.forEach(r => {
    if (r.bookedDate) {
      const current = deptMap.get(r.referralId.department) || { totalWait: 0, count: 0 };
      deptMap.set(r.referralId.department, {
        totalWait: current.totalWait + r.daysWait,
        count: current.count + 1
      });
    }
  });

  const waitTimeData = Array.from(deptMap.entries()).map(([key, val]) => ({
    name: key,
    avgWait: Math.round(val.totalWait / val.count)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Stats Cards */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Totale Richieste</p>
          <h3 className="text-2xl font-bold text-gray-800">{stats.totalReferrals}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Compliance Priorità</p>
          <h3 className={`text-2xl font-bold ${stats.compliantCount / stats.totalReferrals > 0.8 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.totalReferrals > 0 ? Math.round((stats.compliantCount / stats.totalReferrals) * 100) : 0}%
          </h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Attesa Media Totale</p>
          <h3 className="text-2xl font-bold text-blue-600">{stats.avgWaitDays.toFixed(1)} gg</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Agende Chiuse</p>
          <h3 className="text-2xl font-bold text-orange-500">{stats.closedAgendas}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Compliance Priorità</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Attesa Media per Reparto (giorni)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waitTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgWait" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
