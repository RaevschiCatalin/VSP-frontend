import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChartComponent from './Chart';
import Api from './Api';

const ExchangeChart = () => {
  const [chartData, setChartData] = useState(null);

  const onDataProcessed = (processedData) => {
    setChartData(processedData);
  };

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    document.title = `Exchange Rate Chart - ${currentDate}`;
  }, []);

  return (
    <div>
      <h2>Exchange Rate Chart - {new Date().toLocaleDateString()}</h2>
      <Api onDataProcessed={onDataProcessed} />
      {chartData && <ChartComponent data={chartData} />}
      
      <div className="cta-buttons mt-8">
        <Link
          to="/"
          className="cta-button bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 mr-8"
        >
          HomePage
        </Link>
        <Link
          to="/valute-converter"
          className="cta-button bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Currency Converter
        </Link>
      </div>
    </div>
  );
};

export default ExchangeChart;
