import './App.css';
import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';




const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from the server
        const response = await fetch("http://localhost:3001/api/data");
        const xmlData = await response.text();
        setData(xmlData);

        // Save the data to local storage
        localStorage.setItem('xmlData', xmlData);
      } catch (error) {
        console.error(error);
      }
    };

    // Check if data exists in local storage
    const savedData = localStorage.getItem('xmlData');
    if (savedData) {
      setData(savedData);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      // Process the XML data and extract necessary information for the chart
      const processedData = processDataForChart(data);

      // Create a new chart using Chart.js
      const ctx = document.getElementById('chart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: processedData.labels,
          datasets: [
            {
              label: 'Exchange Rate',
              data: processedData.values,
              backgroundColor: 'rgba(0, 123, 255, 0.4)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  color: '#e5e5e5',
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          
          
        }
      });
    }
  }, [data]);

  const processDataForChart = (data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');
  
    const cubeElement = xmlDoc.querySelector('Cube');
    const rateElements = cubeElement.querySelectorAll('Rate');
  
    const labels = [];
    const values = [];
  
    rateElements.forEach((rateElement) => {
      const currency = rateElement.getAttribute('currency');
      const rate = rateElement.textContent;
  
      labels.push(currency);
      values.push(rate);
    });
  
    return { labels, values };
  };
  

  return (
    <div>
      {data ? (
        <canvas id="chart"></canvas>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;



const ChartComponent = () => {
  useEffect(() => {
    const chartContainer = document.getElementById('chartContainer');

    new Chart(chartContainer, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Exchange Rates',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: '#e5e5e5',
            },
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });
  }, []);

  return (
    <div id="chartContainer" style={{ width: '800px', height: '600px' }}></div>
  );
};
//chart component