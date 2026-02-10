
import React from 'react';
import { Word } from '../types';

interface VocabularyListProps {
  words: Word[];
  isOpen: boolean;
  onClose: () => void;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ words, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-900 h-full shadow-2xl border-l border-slate-700 p-8 overflow-y-auto animate-slide-left">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-amber-400 serif">Journal: New Words</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {words.length === 0 ? (
          <p className="text-slate-400 italic">No words collected yet. Continue the story to find more.</p>
        ) : (
          <div className="space-y-6">
            {words.map((w, idx) => (
              <div key={idx} className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-100 mb-1">{w.term}</h3>
                <p className="text-slate-400 leading-snug">{w.definition}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyList;
