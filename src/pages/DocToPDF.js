import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '../Pages.css';

const DocToPDF = () => {
  const [text, setText] = useState('');

  const handleConvert = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save('converted.pdf');
  };

  return (
    <div className="page-container">
      <h2>Convert Text to PDF</h2>
      <textarea
        rows="6"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleConvert}>Convert to PDF</button>
    </div>
  );
};

export default DocToPDF;
