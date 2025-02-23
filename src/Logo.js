import React, { useRef, useEffect, useState } from 'react';
import './Logo.css';

const Logo = () => {
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const [isFocusing, setIsFocusing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const pupils = [pupilLeftRef.current, pupilRightRef.current];

      // Check if cursor is over any button
      const hoveredButton = e.target.closest(".home-button");
      setIsFocusing(!!hoveredButton); // Eyes squeeze when hovering over button

      pupils.forEach((pupil) => {
        if (!pupil) return;
        const rect = pupil.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const moveX = Math.cos(angle) * 6;
        const moveY = Math.sin(angle) * 6;

        pupil.style.transition = "transform 0.2s ease-out";
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="logo-container">
      <h1 className="logo-text">
        Gyanex
        <span className="eye-wrapper">
          <span className={`eye ${isFocusing ? "focus" : ""}`}>
            <span className="pupil" ref={pupilLeftRef}></span>
          </span>
          <span className={`eye ${isFocusing ? "focus" : ""}`}>
            <span className="pupil" ref={pupilRightRef}></span>
          </span>
        </span>
      </h1>
    </div>
  );
};

export default Logo;
