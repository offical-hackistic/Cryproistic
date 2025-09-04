import React from 'react';
import { Shield, AlertTriangle, BarChart3 } from 'lucide-react';

interface RiskMetricsProps {
  portfolioValue: number;
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({ portfolioValue }) => {
  const initialValue = 100000;
  const volatility = Math.abs((portfolioValue - initialValue) / initialValue) * 100;
  const sharpeRatio = 1.8 + Math.random() * 0.4; // Professional Sharpe ratio
  const maxDrawdown = Math.max(0, (initialValue - portfolioValue) / initialValue * 100);
  const var95 = portfolioValue * 0.02; // 2% VaR
  const leverage = 3.2 + Math.random() * 0.6; // Current leverage

  const getRiskLevel = () => {
    if (volatility < 2) return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-400/20' };
    if (volatility < 5) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' };
    return { level: 'High', color: 'text-red-400', bgColor: 'bg-red-400/20' };
  };

  const risk = getRiskLevel();

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Risk Metrics</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-700/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Risk Assessment</span>
            <div className={`px-2 py-1 rounded text-xs font-medium ${risk.bgColor} ${risk.color}`}>
              {risk.level}
            </div>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                risk.level === 'Low' ? 'bg-green-400' :
                risk.level === 'Moderate' ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min(volatility * 10, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400">Daily Vol</span>
            </div>
            <p className="text-sm font-mono text-white">{volatility.toFixed(2)}%</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-gray-400">Max Drawdown</span>
            </div>
            <p className="text-sm font-mono text-white">{maxDrawdown.toFixed(2)}%</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400">VaR (95%)</span>
            </div>
            <p className="text-sm font-mono text-white">${var95.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-400">Leverage</span>
            </div>
            <p className="text-sm font-mono text-white">{leverage.toFixed(1)}x</p>
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Sharpe Ratio</span>
            <p className="text-sm font-mono text-white">{sharpeRatio.toFixed(3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;