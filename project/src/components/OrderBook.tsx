import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, TrendingDown } from 'lucide-react';

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

const OrderBook: React.FC = () => {
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [spread, setSpread] = useState(0);

  useEffect(() => {
    // Initialize order book
    const basePrice = 43250;
    const initBids: OrderBookEntry[] = [];
    const initAsks: OrderBookEntry[] = [];

    for (let i = 0; i < 8; i++) {
      const bidPrice = basePrice - (i + 1) * 0.5;
      const askPrice = basePrice + (i + 1) * 0.5;
      const bidSize = Math.random() * 2 + 0.1;
      const askSize = Math.random() * 2 + 0.1;

      initBids.push({
        price: bidPrice,
        size: bidSize,
        total: bidSize * (i + 1)
      });

      initAsks.push({
        price: askPrice,
        size: askSize,
        total: askSize * (i + 1)
      });
    }

    setBids(initBids);
    setAsks(initAsks);
    setSpread(initAsks[0]?.price - initBids[0]?.price || 0);

    const interval = setInterval(() => {
      // Update order book with realistic movements
      setBids(prev => prev.map(bid => ({
        ...bid,
        price: bid.price * (1 + (Math.random() - 0.5) * 0.0001),
        size: Math.max(0.01, bid.size + (Math.random() - 0.5) * 0.1)
      })));

      setAsks(prev => prev.map(ask => ({
        ...ask,
        price: ask.price * (1 + (Math.random() - 0.5) * 0.0001),
        size: Math.max(0.01, ask.size + (Math.random() - 0.5) * 0.1)
      })));

      setSpread(prev => prev + (Math.random() - 0.5) * 0.1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const maxSize = Math.max(
    ...bids.map(b => b.size),
    ...asks.map(a => a.size)
  );

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Order Book</h2>
        <div className="ml-auto text-xs text-gray-400">
          BTC/USDT
        </div>
      </div>

      <div className="space-y-4">
        {/* Asks (Sell orders) */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Price (USDT)</span>
            <span>Size (BTC)</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {asks.slice().reverse().map((ask, index) => (
              <div key={index} className="relative flex justify-between text-xs py-1">
                <div 
                  className="absolute inset-0 bg-red-500/10 rounded"
                  style={{ width: `${(ask.size / maxSize) * 100}%` }}
                ></div>
                <span className="relative text-red-400 font-mono">{ask.price.toFixed(2)}</span>
                <span className="relative text-white font-mono">{ask.size.toFixed(4)}</span>
                <span className="relative text-gray-400 font-mono">{ask.total.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spread */}
        <div className="flex items-center justify-center py-2 bg-gray-700/30 rounded">
          <span className="text-xs text-yellow-400 font-medium">
            Spread: ${Math.abs(spread).toFixed(2)}
          </span>
        </div>

        {/* Bids (Buy orders) */}
        <div>
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <div key={index} className="relative flex justify-between text-xs py-1">
                <div 
                  className="absolute inset-0 bg-green-500/10 rounded"
                  style={{ width: `${(bid.size / maxSize) * 100}%` }}
                ></div>
                <span className="relative text-green-400 font-mono">{bid.price.toFixed(2)}</span>
                <span className="relative text-white font-mono">{bid.size.toFixed(4)}</span>
                <span className="relative text-gray-400 font-mono">{bid.total.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;