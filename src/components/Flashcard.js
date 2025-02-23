import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Flashcard.css';

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSearch = () => {
    window.open(`https://www.google.com/search?q=${flashcard.answer}`, "_blank");
  };

  return (
    <motion.div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{flashcard.question}</p>
        </div>
        <div className="flashcard-back">
          <h3>{flashcard.answer}</h3>
          <button className="search-button" onClick={handleSearch}>🔍 Search on Google</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Flashcard;
