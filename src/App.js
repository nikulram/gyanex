import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PDFExtractor from './pages/PDFExtractor';
import WebsiteExtractor from './pages/WebsiteExtractor';
import DocToPDF from './pages/DocToPDF';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      {/*Only Home Button on Top */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdf-extractor" element={<PDFExtractor />} />
        <Route path="/website-extractor" element={<WebsiteExtractor />} />
        <Route path="/doc-to-pdf" element={<DocToPDF />} />
      </Routes>
    </div>
  );
};

export default App;
