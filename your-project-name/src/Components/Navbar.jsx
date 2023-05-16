import React from 'react';
import logo from '../img/logo.svg';

const Navbar = ({ showNavbar }) => {
  if (!showNavbar) {
    return null; // Return null to hide the navbar
  }

  return (
    <nav className="navbar bg-white p-4 w-full fixed top-0 left-0 text-2xl">
      <div className="navbar__container flex justify-center items-center">
        <ul className="navbar__menu flex justify-between items-center list-none">
          <li className="mr-24">
            <img className="navbar__logo cursor-pointer w-12 h-12" src={logo} alt="Logo" onClick={() => window.location.href = '/'} />
          </li>
          <li className="mr-48">
            <a href="/" className="text-gray-800 hover:text-gray-500">
              Home
            </a>
          </li>
          <li className="mr-48">
            <a href="/about" className="text-gray-800 hover:text-gray-500">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-800 hover:text-gray-500">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
