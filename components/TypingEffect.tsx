import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  skip?: boolean;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 30, skip = false, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (skip) {
      setDisplayedText(text);
      setIndex(text.length);
      if (onComplete) onComplete();
      return;
    }

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete, skip]);

  const renderFormattedText = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong 
            key={i} 
            className="text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <p className="leading-relaxed text-lg md:text-xl text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-light">
      {renderFormattedText(displayedText)}
    </p>
  );
};

export default TypingEffect;