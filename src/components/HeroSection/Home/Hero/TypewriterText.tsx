"use client"
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  delay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ words, delay = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = words[currentWordIndex];

      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500); // Pause at the end
        }
      } else {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words, delay]);

  return (
    <span className="relative">
      {displayText}
      <span className="absolute right-[-4px] top-0 w-[2px] h-full bg-purple-400 animate-blink" />
    </span>
  );
};