import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Coins, Bot, BarChart3, Zap, ArrowRight } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, link }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  link: string 
}) {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // In a real app, check if user is authenticated
    const isAuthenticated = false;
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/connect-wallet');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
              ArbiNet AI
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-Powered Cross-Chain DeFi Guardian for Optimized Yields and Protected Assets
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Shield}
            title="Smart Risk Management"
            description="AI-powered protection against liquidations, impermanent loss, and smart contract vulnerabilities."
            link="/risk-management"
          />
          <FeatureCard
            icon={Coins}
            title="Yield Optimization"
            description="Automated portfolio rebalancing across multiple chains for maximum returns."
            link="/yield-optimization"
          />
          <FeatureCard
            icon={Bot}
            title="AI Assistant"
            description="Intelligent chatbot providing real-time insights and portfolio recommendations."
            link="/chatbot"
          />
          <FeatureCard
            icon={BarChart3}
            title="Portfolio Analytics"
            description="Comprehensive dashboard with real-time performance metrics and insights."
            link="/portfolio"
          />
          <FeatureCard
            icon={Zap}
            title="Arbitrage Detection"
            description="Automated cross-chain arbitrage opportunities with flash loan execution."
            link="/arbitrage"
          />
          <FeatureCard
            icon={Shield}
            title="Smart Account Security"
            description="Secure multi-chain operations with Safe Smart Account integration."
            link="/security"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-indigo-600/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-indigo-500/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Optimize Your DeFi Portfolio?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust ArbiNet AI to manage their cross-chain DeFi investments.
            </p>
            <button 
              onClick={() => navigate('/connect-wallet')}
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all"
            >
              Connect Wallet <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}