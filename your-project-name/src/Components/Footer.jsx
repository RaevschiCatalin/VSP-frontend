import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center items-center h-20 bg-gray-100">
      <div className="flex space-x-6">
        <a href="https://github.com/RaevschiCatalin" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="text-gray-600 hover:text-gray-800" size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/c%C4%83t%C4%83lin-raevschi-81bb66198/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 hover:text-gray-800" size="2x" />
        </a>
        <a href="mailto:raevschicatalin@gmail.com">
          <FontAwesomeIcon icon={faGoogle} className="text-gray-600 hover:text-gray-800" size="2x" />
        </a>
        <a href="https://www.instagram.com/libelul_andreevici/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="text-gray-600 hover:text-gray-800" size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
