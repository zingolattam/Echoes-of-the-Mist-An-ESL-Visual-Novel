
export interface Word {
  term: string;
  definition: string;
}

export interface Choice {
  text: string;
  nextScene: string;
  emotion: string;
  requiredFlag?: string;
}

export interface Ending {
  title: string;
  type: 'Good' | 'Neutral' | 'Unsettling' | 'True';
  message: string;
}

export interface Line {
  speaker?: string;
  text: string;
  character?: string; // Format: "CharacterName | expression"
}

export interface Scene {
  id: string;
  backgroundId: string;
  imageDescription: string;
  lines: Line[];
  choices?: Choice[];
  newWords?: Word[];
  ending?: Ending;
  flagToSet?: string;
}

export interface AppState {
  playerName: string;
  currentSceneId: string;
  currentLineIndex: number;
  collectedWords: Set<string>;
  gameStarted: boolean;
  gameFinished: boolean;
  flags: string[];
  backgroundImages: Record<string, string>;
  characterSprites: Record<string, string>;
}
