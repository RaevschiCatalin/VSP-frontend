import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page m-16 px-2">
      <h1 className="welcome-message text-5xl mb-6 mt-0">Welcome to VSP Frontend Exchange</h1>
      <p className="description text-xl max-w-3xl mx-auto my-5">
        VSP Frontend Exchange is a user-friendly currency exchange app that allows you to easily convert between different currencies.
        Get real-time exchange rates, explore historical trends with interactive charts, and conveniently convert currencies with just a few clicks.
        Whether you're a traveler, investor, or simply curious about currency exchange rates, we've got you covered.
        Start exploring our features and take control of your currency exchanges today.
      </p>
      <div className="cta-buttons mt-8">
        <Link to="/exchange-chart" className="cta-button bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 mr-8">
          Exchange Rate Chart
        </Link>
        <Link to="/valute-converter" className="cta-button bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-white px-4 py-2 rounded-md transition-colors duration-300">
          Currency Converter
        </Link>
      </div>
    </div>
  );
};


export default HomePage;
