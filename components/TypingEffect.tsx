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
            className="text-amber-300 font-bold px-1 rounded-sm bg-amber-500/10 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] border-b border-amber-500/20"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="leading-relaxed text-xl md:text-2xl text-slate-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-light tracking-wide min-h-[5em]">
      {renderFormattedText(displayedText)}
    </div>
  );
};

export default TypingEffect;