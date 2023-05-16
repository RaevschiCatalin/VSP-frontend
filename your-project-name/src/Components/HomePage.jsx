import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="welcome-message">Welcome to VSP Frontend Exchange</h1>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet mattis magna, non pharetra justo ultrices a. 
        Donec sodales erat quis metus lacinia, eu ullamcorper eros commodo.
      </p>
      <div className="cta-buttons">
        <button className="cta-button">Exchange Rate Chart</button>
        <button className="cta-button">Valute Converter</button>
      </div>
    </div>
  );
};

export default HomePage;
