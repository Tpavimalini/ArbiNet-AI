import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertTriangle, Wallet, BarChart3, Shield, RefreshCw } from 'lucide-react';

interface AssetAllocation {
  asset: string;
  amount: string;
  value: string;
  allocation: number;
  apy: string;
  risk: 'low' | 'medium' | 'high';
}

const assets: AssetAllocation[] = [
  { asset: 'ETH', amount: '12.5', value: '$23,750', allocation: 35, apy: '4.2%', risk: 'low' },
  { asset: 'stETH', amount: '10.2', value: '$19,380', allocation: 25, apy: '5.8%', risk: 'low' },
  { asset: 'USDC', amount: '15,000', value: '$15,000', allocation: 20, apy: '8.2%', risk: 'medium' },
  { asset: 'wBTC', amount: '0.45', value: '$12,825', allocation: 15, apy: '3.1%', risk: 'medium' },
  { asset: 'ARB', amount: '2,500', value: '$3,750', allocation: 5, apy: '12.5%', risk: 'high' },
];

const getRiskColor = (risk: AssetAllocation['risk']) => {
  switch (risk) {
    case 'low':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'high':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default function PortfolioPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio Analytics</h1>
          <p className="text-gray-400">AI-Powered Portfolio Management & Optimization</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-white">$74,705</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Average APY</p>
                <p className="text-2xl font-bold text-white">6.2%</p>
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
                <p className="text-2xl font-bold text-white">Medium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Allocation Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Asset Allocation</h2>
            <button className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-white px-4 py-2 rounded-lg transition-all">
              <RefreshCw className="h-4 w-4" />
              <span>Rebalance</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="pb-4">Asset</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Value</th>
                  <th className="pb-4">Allocation</th>
                  <th className="pb-4">APY</th>
                  <th className="pb-4">Risk</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.asset} className="border-b border-white/5">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-indigo-500" />
                        <span>{asset.asset}</span>
                      </div>
                    </td>
                    <td className="py-4">{asset.amount}</td>
                    <td className="py-4">{asset.value}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500"
                            style={{ width: `${asset.allocation}%` }}
                          />
                        </div>
                        <span>{asset.allocation}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-green-500">{asset.apy}</td>
                    <td className="py-4">
                      <span className={`capitalize ${getRiskColor(asset.risk)}`}>
                        {asset.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Shield className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-500">Risk Alert</h3>
                <p className="text-sm text-gray-300">High concentration in ETH. Consider diversifying to reduce volatility exposure.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-500">Yield Opportunity</h3>
                <p className="text-sm text-gray-300">USDC lending rates on Aave V3 have increased to 8.2%. Consider allocating more stable assets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}