import React, { useState, useEffect } from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

interface LiveTrade {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  timestamp: Date;
  status: 'OPEN' | 'CLOSED';
}

interface LiveTradesProps {
  isTrading: boolean;
}

const LiveTrades: React.FC<LiveTradesProps> = ({ isTrading }) => {
  const [activeTrades, setActiveTrades] = useState<LiveTrade[]>([]);

  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        // Update existing trades
        setActiveTrades(prev => prev.map(trade => {
          const priceChange = (Math.random() - 0.5) * 0.02;
          const newPrice = trade.currentPrice * (1 + priceChange);
          const pnl = trade.side === 'LONG' 
            ? (newPrice - trade.entryPrice) * trade.size
            : (trade.entryPrice - newPrice) * trade.size;
          
          return {
            ...trade,
            currentPrice: newPrice,
            pnl: pnl
          };
        }));

        // Randomly add new trades
        if (Math.random() < 0.2 && activeTrades.length < 8) {
          const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT'];
          const symbol = symbols[Math.floor(Math.random() * symbols.length)];
          const side = Math.random() > 0.5 ? 'LONG' : 'SHORT';
          const size = Math.random() * 0.5 + 0.1;
          
          const basePrices: Record<string, number> = {
            'BTC/USDT': 43250,
            'ETH/USDT': 2680,
            'SOL/USDT': 98.75,
            'ADA/USDT': 0.485,
            'DOT/USDT': 6.42
          };
          
          const entryPrice = basePrices[symbol] * (1 + (Math.random() - 0.5) * 0.01);
          
          const newTrade: LiveTrade = {
            id: Date.now().toString(),
            symbol,
            side,
            size,
            entryPrice,
            currentPrice: entryPrice,
            pnl: 0,
            timestamp: new Date(),
            status: 'OPEN'
          };

          setActiveTrades(prev => [newTrade, ...prev]);
        }

        // Randomly close trades
        if (Math.random() < 0.15 && activeTrades.length > 0) {
          setActiveTrades(prev => prev.slice(1));
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTrading, activeTrades.length]);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Live Positions</h2>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {activeTrades.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No active positions</p>
            <p className="text-xs mt-1">Start trading to see live positions</p>
          </div>
        ) : (
          activeTrades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border-l-4 border-l-blue-500"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                  trade.side === 'LONG' ? 'bg-green-600/20' : 'bg-red-600/20'
                }`}>
                  {trade.side === 'LONG' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">{trade.symbol}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      trade.side === 'LONG' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                    }`}>
                      {trade.side}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {trade.size.toFixed(4)} @ ${trade.entryPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-sm font-mono font-medium ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </p>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{trade.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveTrades;