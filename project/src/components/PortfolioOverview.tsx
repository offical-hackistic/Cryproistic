import React from 'react';
import { Play, Square, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioOverviewProps {
  portfolioValue: number;
  isTrading: boolean;
  onStartTrading: () => void;
  onStopTrading: () => void;
  totalTrades: number;
  winRate: number;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  portfolioValue,
  isTrading,
  onStartTrading,
  onStopTrading,
  totalTrades,
  winRate,
}) => {
  const initialInvestment = 100;
  const profitLoss = portfolioValue - initialInvestment;
  const profitLossPercent = ((profitLoss / initialInvestment) * 100);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Portfolio Overview</h2>
        <div className="flex space-x-2">
          {!isTrading ? (
            <button
              onClick={onStartTrading}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Start Trading</span>
            </button>
          ) : (
            <button
              onClick={onStopTrading}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Square className="w-4 h-4" />
              <span>Stop Trading</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-xs font-medium mb-1">Account Balance</h3>
          <p className="text-xl font-bold text-white font-mono">
            ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-xs font-medium mb-1">Unrealized P&L</h3>
          <div className="flex items-center space-x-2">
            {profitLoss >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <p className={`text-xl font-bold font-mono ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-xs font-medium mb-1">Return %</h3>
          <p className={`text-xl font-bold font-mono ${profitLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-xs font-medium mb-1">Total Trades</h3>
          <p className="text-xl font-bold text-white font-mono">
            {totalTrades}
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-xs font-medium mb-1">Win Rate</h3>
          <p className="text-xl font-bold text-green-400 font-mono">
            {totalTrades > 0 ? (winRate * 100).toFixed(1) : '0.0'}%
          </p>
        </div>
      </div>

    </div>
  );
};

export default PortfolioOverview;