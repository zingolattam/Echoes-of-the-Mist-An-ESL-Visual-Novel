import React, { useState, useEffect, useCallback } from 'react';
import { STORY_DATA } from './constants';
import { AppState, Word } from './types';
import TypingEffect from './components/TypingEffect';
import VocabularyList from './components/VocabularyList';

/**
 * STATIC ASSET MAPPING
 * Maps backgroundId from STORY_DATA to actual image file paths.
 */
const BACKGROUND_ASSETS: Record<string, string> = {
  'bedroom_morning': 'backgrounds/bedroom_morning.jpg',
  'hallway_golden': 'backgrounds/hallway_golden.jpg',
  'kitchen_warm': 'backgrounds/kitchen_warm.jpg',
  'library_dust': 'backgrounds/library_dust.jpg',
  'tower_stars': 'backgrounds/tower_stars.jpg',
  'garden_sunny': 'backgrounds/garden_sunny.jpg'
};

/**
 * STATIC SPRITE MAPPING
 * Maps character names from the 'character' field to their sprite images.
 */
const CHARACTER_ASSETS: Record<string, string> = {
  'Shadow': 'characters/Shadow.png',
  'Mrs. Gable': 'characters/Mrs. Gable.png',
  'Umbrella Girl': 'characters/Umbrella Girl.png'
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    return {
      playerName: '',
      currentSceneId: 'start',
      currentLineIndex: 0,
      collectedWords: new Set(),
      gameStarted: false,
      gameFinished: false,
      flags: [],
      backgroundImages: {},
      characterSprites: {}
    };
  });

  const [inputName, setInputName] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [shouldSkipTyping, setShouldSkipTyping] = useState(false);
  const [isVocabOpen, setIsVocabOpen] = useState(false);
  const [allWords, setAllWords] = useState<Word[]>([]);

  const currentScene = STORY_DATA[state.currentSceneId];
  const currentLine = currentScene?.lines[state.currentLineIndex];
  const isLastLine = state.currentLineIndex === (currentScene?.lines.length - 1);

  // Track the current background source and character sprite based on the scene/line
  const backgroundSrc = currentScene ? BACKGROUND_ASSETS[currentScene.backgroundId] : null;
  const currentCharName = currentLine?.character?.split('|')[0].trim() || '';
  const characterSrc = CHARACTER_ASSETS[currentCharName];

  // Logic to determine if we should show a sprite (skip for Narrator/Player)
  const showSprite = !!currentLine?.character && 
                     currentLine.speaker !== 'Narrator' && 
                     currentLine.speaker !== state.playerName && 
                     currentLine.speaker !== '{PlayerName}';

  useEffect(() => {
    if (!state.gameStarted) return;

    if (currentScene?.newWords) {
      setAllWords(prev => {
        const newOnes = currentScene.newWords!.filter(nw => !prev.some(p => p.term === nw.term));
        return [...prev, ...newOnes];
      });
    }
    if (currentScene?.flagToSet && !state.flags.includes(currentScene.flagToSet)) {
      setState(prev => ({ ...prev, flags: [...prev.flags, currentScene.flagToSet!] }));
    }
  }, [state.currentSceneId, state.gameStarted]);

  const nextLine = useCallback(() => {
    if (isTyping) {
      setShouldSkipTyping(true);
      return;
    }
    if (!isLastLine) {
      setIsTyping(true);
      setShouldSkipTyping(false);
      setState(prev => ({ ...prev, currentLineIndex: prev.currentLineIndex + 1 }));
    }
  }, [isTyping, isLastLine]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && state.gameStarted && !isVocabOpen) {
        e.preventDefault();
        nextLine();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.gameStarted, isVocabOpen, nextLine]);

  const startGame = () => {
    if (inputName.trim()) {
      setState(prev => ({ ...prev, playerName: inputName, gameStarted: true }));
    }
  };

  const handleChoice = (nextId: string) => {
    setIsTyping(true);
    setShouldSkipTyping(false);
    setState(prev => ({
      ...prev,
      currentSceneId: nextId,
      currentLineIndex: 0,
      gameFinished: !!STORY_DATA[nextId].ending
    }));
  };

  const restartGame = () => {
    setState(prev => ({
      ...prev,
      playerName: '',
      currentSceneId: 'start',
      currentLineIndex: 0,
      gameStarted: false,
      gameFinished: false,
      flags: []
    }));
    setAllWords([]);
    setInputName('');
  };

  const formatText = (text: string) => text.replace(/{PlayerName}/g, state.playerName);

  if (!state.gameStarted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800 text-center fade-in">
          <h1 className="text-4xl font-bold text-amber-400 serif mb-4">Echoes of the Mist</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">An interactive language learning visual novel designed for A2-B1 English students, featuring branching paths and a vocabulary collection system.</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name..."
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              onKeyPress={(e) => e.key === 'Enter' && startGame()}
            />
            <button onClick={startGame} disabled={!inputName.trim()} className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all shadow-lg">Begin Journey</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-slate-950 overflow-hidden outline-none" tabIndex={0} onClick={nextLine}>
      
      {/* BACKGROUND LAYER - Fills the entire container */}
      <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
        {backgroundSrc && (
          <img 
            key={currentScene.id}
            src={backgroundSrc} 
            className="w-full h-full object-cover transition-opacity duration-1000" 
            alt="scene-background"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* TOP HUD - UI Controls */}
      <div className="absolute top-6 right-6 flex gap-4 z-40">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsVocabOpen(true); }} 
          className="bg-slate-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700 text-amber-400 font-bold shadow-xl transition-all hover:bg-slate-800 pointer-events-auto"
        >
          Journal: {allWords.length}
        </button>
      </div>

      {/* MAIN GAMEPLAY OVERLAY */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pointer-events-none">
        
        {/* CHARACTER SPRITE - Positioned strictly above the dialogue box, centered */}
        {showSprite && characterSrc && (
          <div className="max-w-4xl mx-auto w-full relative h-0 flex justify-center pointer-events-none z-10">
            <div className="absolute bottom-0 w-64 h-64 md:w-[450px] md:h-[450px] animate-fade-in flex items-end justify-center pointer-events-none">
              <img 
                src={characterSrc}
                className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
                alt={currentCharName}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* DIALOGUE SYSTEM */}
        <div className="max-w-4xl mx-auto w-full space-y-6 pointer-events-auto z-20">
          <div className="vn-gradient p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative min-h-[260px] flex flex-col">
            
            {/* Speaker Name Label */}
            {currentLine?.speaker && (
              <div className="absolute -top-5 left-10 bg-amber-600 text-white px-8 py-2 rounded-full shadow-2xl border border-amber-500/50 z-30">
                <span className="font-bold tracking-widest text-sm uppercase">{formatText(currentLine.speaker)}</span>
              </div>
            )}
            
            {/* Dialogue Text Content */}
            <div className="flex-grow pt-4">
              <TypingEffect 
                text={formatText(currentLine?.text || "")} 
                speed={20}
                skip={shouldSkipTyping}
                onComplete={() => { setIsTyping(false); setShouldSkipTyping(false); }}
              />
            </div>

            {/* Advance Game Hint */}
            {!isTyping && !isLastLine && (
              <div className="absolute bottom-6 right-10 animate-bounce opacity-50 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pointer-events-none">
                <span>Space or Click</span>
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* End Game Message & Restart */}
            {currentScene.ending && !isTyping && (
              <div className="mt-6 border-t border-slate-700/50 pt-6 animate-fade-in">
                <h2 className="text-3xl font-bold serif text-amber-400 mb-1">{currentScene.ending.title}</h2>
                <p className="text-slate-300 italic mb-6">"{currentScene.ending.message}"</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); restartGame(); }} 
                  className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl uppercase tracking-widest text-xs"
                >
                  Restart Journey
                </button>
              </div>
            )}

            {/* Interaction Choices */}
            {!isTyping && isLastLine && currentScene.choices && (
              <div className="grid grid-cols-1 gap-3 mt-8">
                {currentScene.choices.filter(c => !c.requiredFlag || state.flags.includes(c.requiredFlag)).map((choice, idx) => (
                  <button 
                    key={idx} 
                    onClick={(e) => { e.stopPropagation(); handleChoice(choice.nextScene); }} 
                    className="group flex items-center gap-4 bg-slate-900/60 hover:bg-amber-600/10 border border-slate-700 hover:border-amber-500 p-4 rounded-xl text-left transition-all shadow-lg backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-amber-500 text-slate-400 group-hover:text-white flex items-center justify-center font-black text-xs">
                      {idx + 1}
                    </div>
                    <span className="text-slate-100 group-hover:text-amber-50 text-lg">{choice.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <VocabularyList words={allWords} isOpen={isVocabOpen} onClose={() => setIsVocabOpen(false)} />
    </div>
  );
};

export default App;
