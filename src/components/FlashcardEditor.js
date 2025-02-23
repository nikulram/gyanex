import React, { useState } from 'react';
import Flashcard from './Flashcard';
import './Flashcard.css';

const FlashcardEditor = ({ flashcards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const flashcardsPerPage = 6; // Shows 6 per page

  const totalPages = Math.ceil(flashcards.length / flashcardsPerPage);

  const startIndex = (currentPage - 1) * flashcardsPerPage;
  const selectedFlashcards = flashcards.slice(startIndex, startIndex + flashcardsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flashcards-container">
      {selectedFlashcards.length === 0 ? (
        <p className="no-flashcards">No flashcards available. Upload a PDF first!</p>
      ) : (
        selectedFlashcards.map((flashcard, index) => (
          <Flashcard key={index} flashcard={flashcard} />
        ))
      )}

      {/* Pagination Controls */}
      {flashcards.length > flashcardsPerPage && (
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
             Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardEditor;
