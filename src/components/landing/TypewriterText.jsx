import { useEffect, useState } from 'react';

const TypewriterText = ({ words = [], speed = 100, delay = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const currentWord = words[currentWordIndex % words.length];
    
    const handleType = () => {
      if (isDeleting) {
        // Delete text
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        setTypingSpeed(speed / 2);
      } else {
        // Type text
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        setTypingSpeed(speed);
      }

      // Check if we've finished typing a word
      if (!isDeleting && displayText === currentWord) {
        // Pause at end of word
        setTypingSpeed(delay);
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        // Move to next word after deleting
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
        setTypingSpeed(500); // Slight pause before starting next word
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentWordIndex, isDeleting, words, speed, delay, typingSpeed]);

  return (
    <span className="text-agricultural-forest-green">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;
