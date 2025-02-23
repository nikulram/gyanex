import React, { useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import FlashcardEditor from '../components/FlashcardEditor';
import nlp from "compromise";
import '../Pages.css';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFExtractor = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [numPages, setNumPages] = useState(0);

  const handleFileUpload = (event) => {
    setErrorMessage('');
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      processDocument(uploadedFile);
    }
  };

  const processDocument = async (uploadedFile) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result.slice(0);
          const pdf = await getDocument({ data: arrayBuffer }).promise;
          setNumPages(pdf.numPages);
          let fullText = '';

          for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }

          const flashcardsData = generateFlashcards(fullText);
          setFlashcards(flashcardsData);
          setLoading(false);
        } catch (err) {
          setErrorMessage(" Could not extract text.");
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    } catch (err) {
      setErrorMessage(" Unexpected error occurred.");
      setLoading(false);
    }
  };

  const generateFlashcards = (fullText) => {
    const sentences = fullText.split('.').map(s => s.trim()).filter(s => s.length > 10);
    const flashcards = [];

    sentences.forEach(sentence => {
      const doc = nlp(sentence);
      let importantWords = doc.nouns().out("array").filter(word => word.length > 3);

      if (importantWords.length > 0) {
        const wordToRemove = importantWords[0];
        const question = sentence.replace(wordToRemove, "_____");

        flashcards.push({
          question,
          answer: wordToRemove
        });
      }
    });

    return flashcards.slice(0, 10);
  };

  return (
    <div className="page-container">
      <h2> Upload a PDF to Generate Flashcards</h2>
      <input type="file" accept="application/pdf" className="smaller-input" onChange={handleFileUpload} />
      {loading && <p className="loading-text"> Processing PDF...</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {numPages > 0 && <p className="page-count"> Total PDF Pages: {numPages}</p>}
      {flashcards.length > 0 && <FlashcardEditor flashcards={flashcards} />}
    </div>
  );
};

export default PDFExtractor;
