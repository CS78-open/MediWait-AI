import React, { useState, useCallback } from 'react';
import { Activity, Play, RefreshCw, Hospital } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SimulationList from './components/SimulationList';
import AIReport from './components/AIReport';
import { generateReferrals, simulateBooking } from './services/mockCupService';
import { generateAnalysisReport } from './services/geminiService';
import { BookingResult, SimulationStats, AiAnalysisResult } from './types';
import { MOCK_DOCTORS as DOCTORS_DATA } from './constants';

const App: React.FC = () => {
  const [results, setResults] = useState<BookingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);

  // Computed stats
  const stats: SimulationStats = {
    totalReferrals: results.length,
    compliantCount: results.filter(r => r.compliant).length,
    avgWaitDays: results.length > 0 
      ? results.reduce((acc, curr) => acc + curr.daysWait, 0) / results.filter(r => r.bookedDate).length || 0
      : 0,
    closedAgendas: results.filter(r => !r.bookedDate).length
  };

  const runSimulation = useCallback(async () => {
    setLoading(true);
    setAnalysis(null); // Reset old analysis
    
    // Simulate "working" delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate 20 new random referrals
    const newReferrals = generateReferrals(20);
    
    // Process each
    const newResults = newReferrals.map(ref => simulateBooking(ref, DOCTORS_DATA));

    setResults(prev => [...newResults, ...prev]); // Prepend new? No, append new ones or replace. Let's append for history.
    // Actually, for a demo, maybe replacing is cleaner or adding to top. Let's add to top.
    setResults(prev => [...newResults, ...prev].slice(0, 100)); // Keep last 100
    
    setLoading(false);
  }, []);

  const clearData = () => {
    setResults([]);
    setAnalysis(null);
  };

  const handleAiAnalysis = async () => {
    setAiLoading(true);
    
    // Prepare aggregation for AI to reduce token usage
    const deptStats: Record<string, { total: number; avgWait: number }> = {};
    results.forEach(r => {
       if (!r.bookedDate) return;
       const dept = r.referralId.department;
       if (!deptStats[dept]) deptStats[dept] = { total: 0, avgWait: 0 };
       const current = deptStats[dept];
       // running average calculation approximation for summary
       current.avgWait = (current.avgWait * current.total + r.daysWait) / (current.total + 1);
       current.total += 1;
    });

    const failed = results.filter(r => !r.compliant || !r.bookedDate);

    const report = await generateAnalysisReport(stats, failed, deptStats);
    setAnalysis(report);
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Hospital size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">MediWait AI</h1>
              <p className="text-xs text-gray-500">CUP Simulation & Audit System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={clearData}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Reset Dati"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={runSimulation}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white shadow-sm transition-all
                ${loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'}`}
            >
              {loading ? (
                <Activity className="animate-spin" size={18} />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
              {loading ? 'Simulazione in corso...' : 'Simula Nuovi Ingressi'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top AI Section */}
        <AIReport 
          analysis={analysis} 
          loading={aiLoading} 
          onGenerate={handleAiAnalysis}
          hasData={results.length > 0}
        />

        {/* Stats Dashboard */}
        <Dashboard results={results} stats={stats} />

        {/* Detailed List */}
        <SimulationList results={results} />

      </main>
    </div>
  );
};

export default App;