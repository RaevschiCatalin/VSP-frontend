import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Create the chart
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Exchange Rates',
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              stepSize: 1,
            },
            title: {
              display: true,
              text: 'Exchange Rate(to RON)',
            },
          },
        },
      },
    });

    return () => {
      // Clean up the chart when the component unmounts
      chart.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: '100vh' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
