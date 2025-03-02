import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ConnectWalletPage() {
  const navigate = useNavigate();

  const handleConnect = () => {
    // In a real app, this would handle wallet connection
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>
      <div className="flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-300 mb-8">Connect your wallet to access ArbiNet AI's features</p>
          <button
            onClick={handleConnect}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
          >
            Connect MetaMask
          </button>
        </div>
      </div>
    </div>
  );
}