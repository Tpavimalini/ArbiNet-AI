import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Shield, Coins, Bot, BarChart3, Zap, ArrowRight } from 'lucide-react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RiskManagementPage from './pages/RiskManagementPage';
import YieldOptimizationPage from './pages/YieldOptimizationPage';
import ChatbotPage from './pages/ChatbotPage';
import PortfolioPage from './pages/PortfolioPage';
import ArbitragePage from './pages/ArbitragePage';
import SecurityPage from './pages/SecurityPage';
import ConnectWalletPage from './pages/ConnectWalletPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/risk-management" element={<RiskManagementPage />} />
      <Route path="/yield-optimization" element={<YieldOptimizationPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/arbitrage" element={<ArbitragePage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/connect-wallet" element={<ConnectWalletPage />} />
    </Routes>
  );
}

export default App