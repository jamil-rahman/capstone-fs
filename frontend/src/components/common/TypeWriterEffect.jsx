import React, { useState, useEffect } from 'react';

const TypeWriterEffect = ({ text, delay = 20, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [text]);

  return <>{currentText}</>;
};

export default TypeWriterEffect;