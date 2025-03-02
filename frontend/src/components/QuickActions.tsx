import React from 'react';
import { RefreshCw, Zap, BarChart as ChartBar } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center gap-3 justify-center bg-indigo-600/20 hover:bg-indigo-600/30 text-white p-4 rounded-lg transition-all">
          <RefreshCw className="h-5 w-5" />
          <span>Rebalance Portfolio</span>
        </button>
        
        <button className="flex items-center gap-3 justify-center bg-yellow-600/20 hover:bg-yellow-600/30 text-white p-4 rounded-lg transition-all">
          <Zap className="h-5 w-5" />
          <span>Enable Auto-Arbitrage</span>
        </button>
        
        <button className="flex items-center gap-3 justify-center bg-blue-600/20 hover:bg-blue-600/30 text-white p-4 rounded-lg transition-all">
          <ChartBar className="h-5 w-5" />
          <span>View Analytics</span>
        </button>
      </div>
    </div>
  );
}