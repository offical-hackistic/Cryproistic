import React, { useState, useEffect } from 'react';
import { Bot, Activity, Zap, Target } from 'lucide-react';

interface BotStatusProps {
  isTrading: boolean;
  totalTrades: number;
  winRate: number;
}

const BotStatus: React.FC<BotStatusProps> = ({ isTrading, totalTrades, winRate }) => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        setUptime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTrading]);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Bot Status</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isTrading ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm text-gray-400">
              {isTrading ? 'Active Trading' : 'Standby'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Uptime</span>
          </div>
          <span className="text-sm font-mono text-white">{formatUptime(uptime)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Executions</span>
          </div>
          <span className="text-sm font-mono text-white">{totalTrades}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Win Rate</span>
          </div>
          <span className="text-sm font-mono text-green-400">
            {totalTrades > 0 ? `${(winRate * 100).toFixed(1)}%` : '0.0%'}
          </span>
        </div>
      </div>

      <div className="mt-6 p-3 bg-gray-700/30 rounded-lg">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Active Strategy</h3>
        <p className="text-xs text-gray-400">
          Multi-Timeframe Momentum + Mean Reversion
        </p>
        <div className="flex space-x-4 mt-2 text-xs">
          <span className="text-blue-400">TF: 1m/5m</span>
          <span className="text-purple-400">Risk: 2%</span>
          <span className="text-green-400">Leverage: 3x</span>
        </div>
      </div>
    </div>
  );
};

export default BotStatus;