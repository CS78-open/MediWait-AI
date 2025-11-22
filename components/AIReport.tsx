import React from 'react';
import { AiAnalysisResult } from '../types';
import { Bot, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface AIReportProps {
  analysis: AiAnalysisResult | null;
  loading: boolean;
  onGenerate: () => void;
  hasData: boolean;
}

const AIReport: React.FC<AIReportProps> = ({ analysis, loading, onGenerate, hasData }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-indigo-900">Analisi Intelligente CUP</h3>
            <p className="text-indigo-600 text-sm">Powered by Gemini AI</p>
          </div>
        </div>
        
        <button
          onClick={onGenerate}
          disabled={loading || !hasData}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm
            ${loading 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : hasData 
                ? 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          {loading ? 'Analisi in corso...' : 'Genera Report AI'}
        </button>
      </div>

      {analysis && !loading && (
        <div className="space-y-4 relative z-10 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-100/50">
            <p className="text-gray-700 italic leading-relaxed">"{analysis.summary}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50/80 p-4 rounded-lg border border-red-100">
              <h4 className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                <AlertTriangle size={18} /> Criticità Rilevate
              </h4>
              <ul className="space-y-2">
                {analysis.bottlenecks.map((item, idx) => (
                  <li key={idx} className="text-red-700 text-sm flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/80 p-4 rounded-lg border border-emerald-100">
              <h4 className="flex items-center gap-2 text-emerald-800 font-semibold mb-2">
                <Lightbulb size={18} /> Azioni Consigliate
              </h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((item, idx) => (
                  <li key={idx} className="text-emerald-700 text-sm flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Decorative background element */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </div>
  );
};

export default AIReport;
