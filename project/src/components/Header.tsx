import React from 'react';
import { Bot, TrendingUp, AlertTriangle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Cryptoistic Bot</h1>
            <p className="text-sm text-gray-400">Algorithmic Trading System v2.1 Devloped by Dustin Foster</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>API Connected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Data Feed Active</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Market Open</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;