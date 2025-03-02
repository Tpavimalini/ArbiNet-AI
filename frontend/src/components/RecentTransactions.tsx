import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'rebalance' | 'arbitrage';
  amount: string;
  token: string;
  timestamp: string;
}

const transactions: Transaction[] = [
  { id: '1', type: 'deposit', amount: '+2.5 ETH', token: 'ETH', timestamp: '2 minutes ago' },
  { id: '2', type: 'arbitrage', amount: '+$230.50', token: 'USDC', timestamp: '15 minutes ago' },
  { id: '3', type: 'rebalance', amount: '2,000 USDC → stETH', token: 'USDC/stETH', timestamp: '1 hour ago' },
  { id: '4', type: 'withdraw', amount: '-1,000 USDC', token: 'USDC', timestamp: '3 hours ago' },
];

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'deposit':
      return <ArrowDownRight className="h-4 w-4 text-green-500" />;
    case 'withdraw':
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    case 'rebalance':
      return <RefreshCw className="h-4 w-4 text-blue-500" />;
    case 'arbitrage':
      return <Zap className="h-4 w-4 text-yellow-500" />;
  }
};

export default function RecentTransactions() {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-800">
                {getTransactionIcon(tx.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{tx.amount}</p>
                <p className="text-xs text-gray-400">{tx.token}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{tx.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}