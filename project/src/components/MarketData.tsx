import React, { useState, useEffect } from 'react';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
}

const MarketData: React.FC = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC/USDT', price: 43250.00, change24h: 2.45, icon: '₿' },
    { symbol: 'ETH/USDT', price: 2680.50, change24h: -1.23, icon: 'Ξ' },
    { symbol: 'SOL/USDT', price: 98.75, change24h: 3.21, icon: '◎' },
    { symbol: 'ADA/USDT', price: 0.485, change24h: 4.56, icon: '₳' },
    { symbol: 'DOT/USDT', price: 6.42, change24h: -0.87, icon: '●' },
    { symbol: 'AVAX/USDT', price: 24.85, change24h: 1.89, icon: '🔺' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => 
        prev.map(crypto => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.005), // ±0.25% change
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.2, // Small change variation
        }))
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Bitcoin className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-semibold text-white">Market Watch</h2>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>

      <div className="space-y-3">
        {cryptoPrices.map((crypto) => (
          <div
            key={crypto.symbol}
            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{crypto.icon}</span>
              </div>
              <div>
                <p className="font-medium text-white">{crypto.symbol}</p>
                <p className="text-xs text-gray-400">Perpetual</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-mono text-white">
                ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center space-x-1">
                {crypto.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
                <span className={`text-xs font-medium ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketData;