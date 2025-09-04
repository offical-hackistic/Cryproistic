import React, { useState, useEffect } from 'react';
import Header from './Header';
import PortfolioOverview from './PortfolioOverview';
import TradingChart from './TradingChart';
import BotStatus from './BotStatus';
import TradingHistory from './TradingHistory';
import MarketData from './MarketData';
import RiskMetrics from './RiskMetrics';
import LiveTrades from './LiveTrades';
import OrderBook from './OrderBook';

const Dashboard: React.FC = () => {
  const [portfolioValue, setPortfolioValue] = useState(100);
  const [isTrading, setIsTrading] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [totalTrades, setTotalTrades] = useState(0);
  const [winRate, setWinRate] = useState(0);

  useEffect(() => {
    if (isTrading && startTime) {
      const interval = setInterval(() => {
        // Simulate professional trading algorithm
        const timeDiff = Date.now() - startTime.getTime();
        const hoursElapsed = timeDiff / (1000 * 60 * 60);
        
        // Advanced algorithmic trading simulation
        const marketVolatility = (Math.random() - 0.5) * 0.02; // ±1% per update
        const trendComponent = Math.sin(hoursElapsed * 0.5) * 0.01; // Trend following
        const momentumFactor = Math.random() > 0.6 ? 0.005 : -0.002; // Momentum bias
        
        setPortfolioValue(prev => {
          const totalChange = marketVolatility + trendComponent + momentumFactor;
          const newValue = prev * (1 + totalChange);
          return Math.max(50, newValue); // Don't go below $50
        });
        
        // Update trading statistics
        if (Math.random() < 0.3) {
          setTotalTrades(prev => {
            const newTotalTrades = prev + 1;
            const isWin = Math.random() > 0.35; // 65% win rate
            setWinRate(currentWinRate => {
              const totalWins = currentWinRate * prev;
              const newTotalWins = totalWins + (isWin ? 1 : 0);
              return newTotalWins / newTotalTrades;
            });
            return newTotalTrades;
          });
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isTrading, startTime, totalTrades]);

  const startTrading = () => {
    setIsTrading(true);
    setStartTime(new Date());
    setTotalTrades(0);
    setWinRate(0);
  };

  const stopTrading = () => {
    setIsTrading(false);
    setStartTime(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <PortfolioOverview 
              portfolioValue={portfolioValue}
              isTrading={isTrading}
              onStartTrading={startTrading}
              onStopTrading={stopTrading}
              totalTrades={totalTrades}
              winRate={winRate}
            />
          </div>
          <div>
            <BotStatus isTrading={isTrading} totalTrades={totalTrades} winRate={winRate} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <TradingChart portfolioValue={portfolioValue} />
          <MarketData />
          <OrderBook />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <LiveTrades isTrading={isTrading} />
          <TradingHistory portfolioValue={portfolioValue} />
          <RiskMetrics portfolioValue={portfolioValue} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;