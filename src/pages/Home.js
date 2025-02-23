import React from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import '../Pages.css'; 

const Home = () => {
  return (
    <div className="home-fullscreen"> {}
      <Logo />
      <div className="home-content">
        <div className="home-buttons">
          <Link to="/pdf-extractor" className="home-button">Extract from PDF</Link>
          <Link to="/website-extractor" className="home-button">Extract from Website</Link>
          <Link to="/doc-to-pdf" className="home-button">Convert to PDF</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
