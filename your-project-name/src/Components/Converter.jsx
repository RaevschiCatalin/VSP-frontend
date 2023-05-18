import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Api from './Api';

const Converter = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(null);
  const [selectedToCurrency, setSelectedToCurrency] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [conversionResult, setConversionResult] = useState('');

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
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFromCurrencyChange = (selectedOption) => {
    setSelectedFromCurrency(selectedOption);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setSelectedToCurrency(selectedOption);
  };

  const handleConversion = () => {
    if (!selectedFromCurrency || !selectedToCurrency || !inputValue) {
      alert('Please select currencies and enter an amount.');
      return;
    }

    const fromCurrency = selectedFromCurrency.value;
    const toCurrency = selectedToCurrency.value;

    if (fromCurrency === 'RON') {
      const toRate = chartData.values[chartData.labels.indexOf(toCurrency)];
      const convertedAmount = inputValue / toRate;
      setConversionResult(`${inputValue} RON = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } else if (toCurrency === 'RON') {
      const fromRate = chartData.values[chartData.labels.indexOf(fromCurrency)];
      const convertedAmount = inputValue * fromRate;
      setConversionResult(`${inputValue} ${fromCurrency} = ${convertedAmount.toFixed(2)} RON`);
    } else {
      const fromRate = chartData.values[chartData.labels.indexOf(fromCurrency)];
      const toRate = chartData.values[chartData.labels.indexOf(toCurrency)];
      const convertedAmount = (inputValue / toRate) * fromRate;
      setConversionResult(`${inputValue} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Currency Converter</h2>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 w-40"
              placeholder="Enter amount"
              value={inputValue}
              onChange={handleInputChange}
            />

            <Select
              className="flex-grow ml-4"
              placeholder="From currency"
              value={selectedFromCurrency}
              onChange={handleFromCurrencyChange}
              options={[
                { value: 'RON', label: 'RON' },
                ...chartData.labels.map((label) => ({
                  value: label,
                  label: label,
                })),
              ]}
            />

            <Select
              className="flex-grow ml-4"
              placeholder="To currency"
              value={selectedToCurrency}
              onChange={handleToCurrencyChange}
              options={[
                { value: 'RON', label: 'RON' },
                ...chartData.labels.map((label) => ({
                  value: label,
                  label: label,
                })),
              ]}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleConversion}
          >
            Convert
          </button>

          {conversionResult && <p className="mt-4">{conversionResult}</p>}

          <div className="cta-buttons mt-8">
            <Link
              to="/exchange-chart"
              className="cta-button bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 mr-8"
            >
              Exchange Rate Chart
            </Link>
            <Link
              to="/valute-converter"
              className="cta-button bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Currency Converter
            </Link>
          </div>
        </>
      )}

      <Api onDataProcessed={setChartData} />
    </div>
  );
};

export default Converter;
