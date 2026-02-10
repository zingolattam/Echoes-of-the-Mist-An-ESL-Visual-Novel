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
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-900/90 h-full shadow-[0_0_100px_rgba(0,0,0,0.6)] border-l border-white/10 p-10 overflow-y-auto transform transition-transform duration-500 ease-out flex flex-col">
        <div className="flex justify-between items-center mb-10 shrink-0">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 serif tracking-tight">Traveler's Journal</h2>
            <div className="h-1 w-12 bg-amber-500/40 rounded-full mt-1" />
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-all hover:rotate-90 p-2 bg-white/5 rounded-full"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow">
          {words.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-slate-700 mb-6 flex justify-center">
                <svg className="w-20 h-20 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-slate-500 italic text-lg">Your pages are currently blank. Discover words in the story to fill them.</p>
            </div>
          ) : (
            <div className="space-y-10 pb-12">
              {words.map((w, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-amber-500/0 group-hover:bg-amber-500/60 transition-all rounded-full" />
                  <h3 className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mb-3 opacity-60 group-hover:opacity-100 transition-opacity">Entry {idx + 1}</h3>
                  <h4 className="text-2xl font-bold text-slate-50 mb-2">{w.term}</h4>
                  <p className="text-slate-400 leading-relaxed text-lg font-light">{w.definition}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="shrink-0 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <span>{words.length} Vocabulary Items</span>
          <span className="text-amber-500/50">Echoes of the Mist</span>
        </div>
      </div>
    </div>
  );
};

export default VocabularyList;