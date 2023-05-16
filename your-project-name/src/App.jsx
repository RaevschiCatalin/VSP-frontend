import './App.css';
import React, { useEffect, useState } from 'react';
import Api from './Components/Api';
import ChartComponent from './Components/Chart';
import Navbar from './Components/Navbar';

const App = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onDataProcessed = (processedData) => {
    setChartData(processedData);
    setIsLoading(false);
  };

  useEffect(() => {
    const savedData = localStorage.getItem('chartData');
    if (savedData) {
      setChartData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (chartData) {
      localStorage.setItem('chartData', JSON.stringify(chartData));
    }
  }, [chartData]);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(false);
    }, 4000);
  }, []);

  return (
    <div className="container">
    <Navbar />
      {showTitle && (
        <div className="svg-wrapper">
          <svg height="200" width="800" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape1" height="200" width="800" />
            <rect className="shape2" height="200" width="800" />
            <text className="text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
              VSP Frontend Exchange
            </text>
          </svg>
        </div>
        
      )}
        
      {!showTitle && (
        
        <div className="flex flex-col items-center justify-center max-h-0">
        <Navbar showNavbar={!showTitle} />
          <h1 className="title">Exchange Rate Chart</h1>
          <Api onDataProcessed={onDataProcessed} />
          {chartData ? <ChartComponent data={chartData} /> : <p>Loading...</p>}
        </div>
      )}
      </div>
  );
};

export default App;
