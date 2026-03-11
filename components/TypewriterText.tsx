'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  initialText: string;
  rotatingTexts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  initialText,
  rotatingTexts,
  speed = 80, 
  deleteSpeed = 50,
  pauseTime = 2000 
}) => {
  const [displayInitial, setDisplayInitial] = useState('');
  const [initialComplete, setInitialComplete] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentText = rotatingTexts[textIndex];

  // Type out initial text once
  useEffect(() => {
    if (initialComplete) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= initialText.length) {
        setDisplayInitial(initialText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setInitialComplete(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [initialText, speed, initialComplete]);

  // Rotate through texts after initial is complete
  useEffect(() => {
    if (!initialComplete) return;

    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeout = setTimeout(handleTyping, speed);
        } else {
          // Finished typing, wait then start deleting
          timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
          timeout = setTimeout(handleTyping, deleteSpeed);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
          timeout = setTimeout(handleTyping, 500);
        }
      }
    };

    timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentText, textIndex, rotatingTexts.length, speed, deleteSpeed, pauseTime, initialComplete]);

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <>
      {displayInitial}
      {initialComplete && (
        <>
          {' '}
          <span className="inline-block">
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </span>
        </>
      )}
      {!initialComplete && (
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
      )}
    </>
  );
};

export default TypewriterText;