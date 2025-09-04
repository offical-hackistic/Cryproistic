import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface Trade {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  amount: number;
  price: number;
  timestamp: Date;
  profit?: number;
}

interface TradingHistoryProps {
  portfolioValue: number;
}

const TradingHistory: React.FC<TradingHistoryProps> = ({ portfolioValue }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Simulate trades based on portfolio changes
    const interval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% chance of trade
        const symbols = ['BTC', 'ETH', 'ADA', 'SOL', 'DOT'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
        const amount = Math.random() * 0.1 + 0.01;
        
        const basePrices: Record<string, number> = {
          BTC: 43250,
          ETH: 2680,
          ADA: 0.485,
          SOL: 98.75,
          DOT: 6.42
        };
        
        const price = basePrices[symbol] * (1 + (Math.random() - 0.5) * 0.02);
        
        const newTrade: Trade = {
          id: Date.now().toString(),
          type,
          symbol,
          amount,
          price,
          timestamp: new Date(),
          profit: (Math.random() - 0.35) * 500, // More realistic profit ranges
        };

        setTrades(prev => [newTrade, ...prev.slice(0, 9)]); // Keep last 10 trades
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Trading History</h2>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {trades.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No trades executed yet</p>
            <p className="text-xs mt-1">Start trading to see activity</p>
          </div>
        ) : (
          trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  trade.type === 'BUY' ? 'bg-green-600/20' : 'bg-red-600/20'
                }`}>
                  {trade.type === 'BUY' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      trade.type === 'BUY' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                    }`}>
                      {trade.type}
                    </span>
                    <span className="text-white font-medium">{trade.symbol}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {trade.amount.toFixed(4)} @ ${trade.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {trade.timestamp.toLocaleTimeString()}
                </p>
                {trade.profit && (
                  <p className={`text-xs font-medium ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.profit >= 0 ? '+' : ''}${trade.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TradingHistory;