import axios from 'axios';
import { useEffect, useRef } from 'react';

const Api = ({ onDataProcessed }) => {
  const isDataFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data has already been fetched and saved for the current date
        const currentDate = new Date().toISOString().slice(0, 10);
        const savedFetchDate = localStorage.getItem('fetchDate');

        if (isDataFetched.current && savedFetchDate === currentDate) {
          return;
        }

        // Fetch the data from the server
        const response = await axios.get('http://localhost:3001/api/data', {
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
        const xmlData = response.data;

        // Process the XML data and pass it to the callback
        const processedData = processDataForChart(xmlData);
        onDataProcessed(processedData);

        // Save the data to local storage
        localStorage.setItem('xmlData', xmlData);

        // Save the current date to local storage
        localStorage.setItem('fetchDate', currentDate);

        // Mark data as fetched
        isDataFetched.current = true;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [onDataProcessed]);

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
  
      if (currency === 'XAU') {
        labels.push(currency);
        values.push(parseFloat(rate) / 100);
      } else {
        labels.push(currency);
        values.push(parseFloat(rate));
      }
    });
  
    return { labels, values };
  };
};

export default Api;
