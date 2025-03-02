import React from 'react';
import { DollarSign, TrendingUp, AlertTriangle, Percent } from 'lucide-react';

interface PortfolioStats {
  totalValue: string;
  totalYield: string;
  riskScore: number;
  dailyChange: string;
}

const stats: PortfolioStats = {
  totalValue: "$125,430.50",
  totalYield: "12.5%",
  riskScore: 85,
  dailyChange: "+2.3%"
};

export default function PortfolioOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Value</p>
            <p className="text-2xl font-bold text-white">{stats.totalValue}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <Percent className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Yield</p>
            <p className="text-2xl font-bold text-white">{stats.totalYield}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Risk Score</p>
            <p className="text-2xl font-bold text-white">{stats.riskScore}/100</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">24h Change</p>
            <p className="text-2xl font-bold text-white">{stats.dailyChange}</p>
          </div>
        </div>
      </div>
    </div>
  );
}