/*
  Author: Nikul Ram
*/

import React from 'react';
import './App.css';

const FlashcardEditor = ({ flashcards, setFlashcards }) => {
  // Handle editing of flashcard fields
  const handleEdit = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value };
    setFlashcards(updatedFlashcards);
  };

  // Increase score for a flashcard
  const increaseScore = (index) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index].score = updatedFlashcards[index].score + 1;
    setFlashcards(updatedFlashcards);
  };

  // Decrease score for a flashcard
  const decreaseScore = (index) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index].score = updatedFlashcards[index].score - 1;
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="flashcard-editor">
      {flashcards.map((card, index) => (
        <div className="flashcard" key={index}>
          <label>Question:</label>
          <input
            type="text"
            value={card.question}
            onChange={(e) => handleEdit(index, 'question', e.target.value)}
          />
          <label>Answer:</label>
          <textarea
            value={card.answer}
            onChange={(e) => handleEdit(index, 'answer', e.target.value)}
          />
          <div className="score-section">
            <span>Score: {card.score}</span>
            <button onClick={() => increaseScore(index)}>Correct</button>
            <button onClick={() => decreaseScore(index)}>Incorrect</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardEditor;
