import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  RefreshCw, 
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Message types
type MessageType = 'text' | 'chart' | 'recommendation' | 'alert' | 'action';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: MessageType;
  data?: any; // For charts, recommendations, etc.
}

// Sample portfolio data
const portfolioData = {
  totalValue: "$125,430.50",
  assets: [
    { name: "ETH", allocation: 35, value: "$43,900.68", risk: "medium" },
    { name: "USDC", allocation: 25, value: "$31,357.63", risk: "low" },
    { name: "wBTC", allocation: 20, value: "$25,086.10", risk: "medium" },
    { name: "ARB", allocation: 15, value: "$18,814.58", risk: "high" },
    { name: "stETH", allocation: 5, value: "$6,271.53", risk: "low" }
  ],
  riskScore: 65,
  yieldOpportunities: [
    { protocol: "Aave", asset: "USDC", apy: "4.2%", risk: "low" },
    { protocol: "Lido", asset: "ETH", apy: "3.8%", risk: "low" },
    { protocol: "Curve", asset: "stETH/ETH", apy: "5.3%", risk: "medium" },
    { protocol: "Uniswap", asset: "ETH/USDC", apy: "12.5%", risk: "high" }
  ],
  arbitrageOpportunities: [
    { 
      path: "ETH → USDC → DAI → ETH", 
      profit: "$120.50", 
      exchanges: "Uniswap → Curve → SushiSwap", 
      risk: "medium" 
    },
    { 
      path: "USDC → ARB → USDC", 
      profit: "$85.30", 
      exchanges: "Uniswap → Balancer", 
      risk: "low" 
    }
  ]
};

// Sample suggested actions
const suggestedActions = [
  { id: '1', text: 'What is my portfolio status?', icon: BarChart3 },
  { id: '2', text: 'Show me yield opportunities', icon: TrendingUp },
  { id: '3', text: 'Any arbitrage opportunities?', icon: Zap },
  { id: '4', text: 'What are my risk factors?', icon: Shield },
  { id: '5', text: 'Rebalance my portfolio', icon: RefreshCw }
];

export default function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your ArbiNet AI Assistant. How can I help optimize your DeFi portfolio today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      handleAIResponse(inputMessage);
      setIsLoading(false);
    }, 1000);
  };

  const handleAIResponse = (userQuery: string) => {
    const query = userQuery.toLowerCase();
    let aiResponse: Message;
    
    // Portfolio status query
    if (query.includes('portfolio') || query.includes('status') || query.includes('balance')) {
      aiResponse = {
        id: Date.now().toString(),
        content: `Your portfolio is currently valued at ${portfolioData.totalValue} with a risk score of ${portfolioData.riskScore}/100. Your largest allocation is ETH at 35% of your portfolio. Would you like to see detailed analytics or rebalancing suggestions?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'chart',
        data: {
          assets: portfolioData.assets
        }
      };
    } 
    // Yield opportunities query
    else if (query.includes('yield') || query.includes('apy') || query.includes('interest')) {
      aiResponse = {
        id: Date.now().toString(),
        content: `I've found several high-yield opportunities for your portfolio. The highest APY is currently 12.5% for ETH/USDC on Uniswap, but it comes with higher risk. For a safer option, Aave is offering 4.2% on USDC. Would you like me to allocate some funds to these opportunities?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'recommendation',
        data: {
          opportunities: portfolioData.yieldOpportunities
        }
      };
    } 
    // Arbitrage opportunities query
    else if (query.includes('arbitrage') || query.includes('trade') || query.includes('profit')) {
      aiResponse = {
        id: Date.now().toString(),
        content: `I've detected 2 profitable arbitrage opportunities. The most profitable one is ETH → USDC → DAI → ETH across Uniswap, Curve, and SushiSwap with an estimated profit of $120.50 after gas fees. Would you like me to execute this trade using a flash loan?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'recommendation',
        data: {
          opportunities: portfolioData.arbitrageOpportunities
        }
      };
    } 
    // Risk analysis query
    else if (query.includes('risk') || query.includes('safe') || query.includes('protect')) {
      aiResponse = {
        id: Date.now().toString(),
        content: `Your portfolio has a moderate risk score of ${portfolioData.riskScore}/100. Your highest risk exposure is from ARB (15% allocation) and your ETH/USDC position on Uniswap which has impermanent loss risk. I recommend reducing your ARB position to 5% and moving some funds to Aave for stable yields.`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'alert',
        data: {
          riskScore: portfolioData.riskScore,
          highRiskAssets: portfolioData.assets.filter(a => a.risk === 'high')
        }
      };
    } 
    // Rebalance query
    else if (query.includes('rebalance') || query.includes('optimize') || query.includes('adjust')) {
      aiResponse = {
        id: Date.now().toString(),
        content: `Based on current market conditions and your risk profile, I recommend the following rebalancing: Reduce ARB from 15% to 5%, increase USDC from 25% to 30%, and allocate 5% to stETH on Lido for stable staking rewards. This would lower your risk score to 55/100 while maintaining similar yield. Would you like me to execute this rebalance?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'action',
        data: {
          currentAllocation: portfolioData.assets,
          suggestedAllocation: [
            { name: "ETH", allocation: 35, value: "$43,900.68", risk: "medium" },
            { name: "USDC", allocation: 30, value: "$37,629.15", risk: "low" },
            { name: "wBTC", allocation: 20, value: "$25,086.10", risk: "medium" },
            { name: "ARB", allocation: 5, value: "$6,271.53", risk: "high" },
            { name: "stETH", allocation: 10, value: "$12,543.05", risk: "low" }
          ]
        }
      };
    } 
    // Default response
    else {
      aiResponse = {
        id: Date.now().toString(),
        content: `I'm here to help with your DeFi portfolio. You can ask me about your portfolio status, yield opportunities, arbitrage trades, risk analysis, or portfolio rebalancing. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle voice recognition
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
    } else {
      // Start recording
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage("What is my portfolio status?");
      }, 2000);
    }
  };

  const handleSuggestedAction = (text: string) => {
    setInputMessage(text);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Render message based on type
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'chart':
        return (
          <div className="space-y-3">
            <p>{message.content}</p>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Asset Allocation</h4>
              <div className="space-y-2">
                {message.data?.assets.map((asset: any) => (
                  <div key={asset.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${asset.risk === 'low' ? 'bg-green-500' : asset.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span>{asset.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500"
                          style={{ width: `${asset.allocation}%` }}
                        />
                      </div>
                      <span className="text-sm">{asset.allocation}%</span>
                      <span className="text-sm text-gray-400">{asset.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white px-3 py-1 rounded-lg text-sm transition-all">
                View Details
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Rebalance Portfolio
              </button>
            </div>
          </div>
        );
      
      case 'recommendation':
        return (
          <div className="space-y-3">
            <p>{message.content}</p>
            <div className="bg-white/5 p-4 rounded-lg">
              {message.data?.opportunities && (
                <>
                  <h4 className="text-sm font-medium mb-2">
                    {message.data.opportunities[0].hasOwnProperty('protocol') 
                      ? 'Yield Opportunities' 
                      : 'Arbitrage Opportunities'}
                  </h4>
                  <div className="space-y-2">
                    {message.data.opportunities.map((opp: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        {opp.hasOwnProperty('protocol') ? (
                          // Yield opportunity
                          <>
                            <div>
                              <p className="font-medium">{opp.protocol}</p>
                              <p className="text-sm text-gray-400">{opp.asset}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-500">{opp.apy}</p>
                              <p className="text-sm text-gray-400">Risk: {opp.risk}</p>
                            </div>
                          </>
                        ) : (
                          // Arbitrage opportunity
                          <>
                            <div>
                              <p className="font-medium">{opp.path}</p>
                              <p className="text-sm text-gray-400">{opp.exchanges}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-500">{opp.profit}</p>
                              <p className="text-sm text-gray-400">Risk: {opp.risk}</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white px-3 py-1 rounded-lg text-sm transition-all">
                More Info
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm transition-all">
                {message.data?.opportunities[0].hasOwnProperty('protocol') 
                  ? 'Allocate Funds' 
                  : 'Execute Trade'}
              </button>
            </div>
          </div>
        );
      
      case 'alert':
        return (
          <div className="space-y-3">
            <p>{message.content}</p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-yellow-500" />
                <h4 className="text-sm font-medium text-yellow-500">Risk Alert</h4>
              </div>
              <p className="text-sm">Risk Score: {message.data?.riskScore}/100</p>
              {message.data?.highRiskAssets && message.data.highRiskAssets.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">High Risk Assets:</p>
                  <ul className="list-disc list-inside text-sm">
                    {message.data.highRiskAssets.map((asset: any) => (
                      <li key={asset.name}>{asset.name} ({asset.allocation}%)</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Ignore
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Reduce Risk
              </button>
            </div>
          </div>
        );
      
      case 'action':
        return (
          <div className="space-y-3">
            <p>{message.content}</p>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Rebalancing Suggestion</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Current Allocation</p>
                  <div className="flex gap-1">
                    {message.data?.currentAllocation.map((asset: any) => (
                      <div 
                        key={`current-${asset.name}`}
                        className="h-8 relative group"
                        style={{ width: `${asset.allocation}%` }}
                      >
                        <div 
                          className={`absolute inset-0 ${
                            asset.risk === 'low' ? 'bg-green-500/50' : 
                            asset.risk === 'medium' ? 'bg-yellow-500/50' : 
                            'bg-red-500/50'
                          }`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                          {asset.name}
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {asset.name}: {asset.allocation}% ({asset.value})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Suggested Allocation</p>
                  <div className="flex gap-1">
                    {message.data?.suggestedAllocation.map((asset: any) => (
                      <div 
                        key={`suggested-${asset.name}`}
                        className="h-8 relative group"
                        style={{ width: `${asset.allocation}%` }}
                      >
                        <div 
                          className={`absolute inset-0 ${
                            asset.risk === 'low' ? 'bg-green-500/50' : 
                            asset.risk === 'medium' ? 'bg-yellow-500/50' : 
                            'bg-red-500/50'
                          }`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                          {asset.name}
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {asset.name}: {asset.allocation}% ({asset.value})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Modify
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Execute Rebalance
              </button>
            </div>
          </div>
        );
      
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">AI Assistant</h1>
            <p className="text-gray-400">Get real-time DeFi insights and recommendations</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
      </div>
      
      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4">
        {/* Suggested Actions */}
        <div className="mb-4">
          <div 
            className="flex items-center justify-between bg-white/5 backdrop-blur-xl rounded-lg p-3 cursor-pointer"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <span className="font-medium">Suggested Actions</span>
            {showSuggestions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          
          {showSuggestions && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              {suggestedActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-lg p-3 text-left transition-all"
                    onClick={() => handleSuggestedAction(action.text)}
                  >
                    <Icon className="h-5 w-5 text-indigo-400" />
                    <span>{action.text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 bg-indigo-500/20 rounded-full">
                      <Bot className="h-4 w-4 text-indigo-500" />
                    </div>
                    <span className="text-sm font-medium">ArbiNet AI</span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
                {renderMessage(message)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-4 bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-indigo-500/20 rounded-full">
                    <Bot className="h-4 w-4 text-indigo-500" />
                  </div>
                  <span className="text-sm font-medium">ArbiNet AI</span>
                </div>
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRecording}
              className={`p-2 rounded-full ${
                isRecording ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              } transition-all`}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your portfolio, yield opportunities, or market insights..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ''}
              className={`p-2 rounded-full ${
                inputMessage.trim() === ''
                  ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-all`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}