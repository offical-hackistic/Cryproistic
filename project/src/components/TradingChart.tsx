import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

interface TradingChartProps {
  portfolioValue: number;
}

const TradingChart: React.FC<TradingChartProps> = ({ portfolioValue }) => {
  const [priceData, setPriceData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      setPriceData(prev => {
        const newData = [...prev, portfolioValue];
        return newData.slice(-30); // Keep last 30 points
      });
      
      setTimeLabels(prev => {
        const newLabels = [...prev, timeLabel];
        return newLabels.slice(-30);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [portfolioValue]);

  const maxValue = Math.max(...priceData, 100);
  const minValue = Math.min(...priceData, 100);
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Portfolio Value (USD)</h2>
        <div className="flex items-center space-x-2 text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Real-time</span>
        </div>
      </div>

      <div className="relative h-64">
        <svg width="100%" height="100%" className="text-gray-600">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(y => (
            <line
              key={y}
              x1="0"
              y1={`${y * 100}%`}
              x2="100%"
              y2={`${y * 100}%`}
              stroke="currentColor"
              strokeOpacity="0.1"
            />
          ))}

          {/* Price line */}
          {priceData.length > 1 && (
            <polyline
              points={priceData
                .map((value, index) => {
                  const x = (index / (priceData.length - 1)) * 100;
                  const y = 100 - ((value - minValue) / range) * 100;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
          )}

          {/* Data points */}
          {priceData.map((value, index) => {
            const x = (index / Math.max(priceData.length - 1, 1)) * 100;
            const y = 100 - ((value - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill="#10B981"
                className="opacity-80"
              />
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-12">
          <span>${maxValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          <span>${((maxValue + minValue) / 2).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          <span>${minValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      {/* Time labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
        {timeLabels.length > 0 && (
          <>
            <span>{timeLabels[0]}</span>
            <span>{timeLabels[Math.floor(timeLabels.length / 2)]}</span>
            <span>{timeLabels[timeLabels.length - 1]}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default TradingChart;