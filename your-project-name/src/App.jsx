import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ExchangeChart from './Components/ExchangeChart';
import Converter from './Components/Converter';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './App.css';

const App = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(false);
      setTimeout(() => {
        setShowContent(true);
      }, 0);
    }, 3000);
  }, []);

  return (
    <Router>
      <div className="container">
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

        {showContent && (
          <>
            <div className="main-content fade-in">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exchange-chart" element={<ExchangeChart />} />
                <Route path="/valute-converter" element={<Converter />} />
              </Routes>
            </div>
            <Navbar showNavbar={true} />
            <Footer />
          </>
        )}

        {!showTitle && !showContent && <Navbar showNavbar={true} />}
      </div>
    </Router>
  );
};

export default App;
