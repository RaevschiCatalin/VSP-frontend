import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ExchangeChart from './Components/ExchangeChart';
import ValuteConverter from './Components/ValuteConverter';
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
    <Router>
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
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exchange-chart" element={<ExchangeChart />} />
              <Route path="/valute-converter" element={<ValuteConverter />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
