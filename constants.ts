import { Scene } from './types';

export const STORY_DATA: Record<string, Scene> = {
  'start': {
    id: 'start',
    backgroundId: 'bedroom_morning',
    imageDescription: '[BACKGROUND: bedroom_morning]',
    lines: [
      { speaker: 'Narrator', text: "The morning sun shines brightly through your bedroom window, filling the room with a **warm** glow." },
      { speaker: 'Narrator', text: "A gentle breeze brings the **fragrant** scent of fresh flowers into the room." },
      { speaker: 'Narrator', text: "Suddenly, you hear a **peculiar** and **distant** sound coming from the hallway." },
      { speaker: '{PlayerName}', text: "That is strange. It sounds like tiny silver bells ringing." },
      { speaker: 'Narrator', text: "The sound is rhythmic, soft, and strangely **familiar**." },
      { speaker: '{PlayerName}', text: "I should check what is happening." }
    ],
    newWords: [
      { term: 'warm', definition: 'giving a comfortable and pleasant feeling' },
      { term: 'fragrant', definition: 'having a pleasant smell' },
      { term: 'peculiar', definition: 'strange or unusual in an interesting way' },
      { term: 'distant', definition: 'far away in space or time' },
      { term: 'familiar', definition: 'something you recognize or know well' }
    ],
    choices: [
      { text: "Follow the bell sounds into the hallway.", nextScene: 'hallway', emotion: 'Curiosity' },
      { text: "Go to the kitchen first.", nextScene: 'kitchen', emotion: 'Avoidance' }
    ]
  },

  'hallway': {
    id: 'hallway',
    backgroundId: 'hallway_golden',
    imageDescription: '[BACKGROUND: hallway_golden]',
    lines: [
      { speaker: 'Narrator', text: "You slowly open your bedroom door. The hallway is gone." },
      { speaker: 'Narrator', text: "It is replaced by a **dense** cloud of golden dust, floating silently." },
      { speaker: 'Shadow', text: "Welcome back, {PlayerName}. Do not be afraid.", character: 'Shadow | neutral | above textbox' },
      { speaker: 'Shadow', text: "The town is finally waking up from its long sleep.", character: 'Shadow | calm | above textbox' },
      { speaker: '{PlayerName}', text: "Where is my house? Who are you?" },
      { speaker: 'Shadow', text: "I am merely a guide. Seek the library if you want the truth.", character: 'Shadow | calm | above textbox' }
    ],
    newWords: [
      { term: 'dense', definition: 'thick and difficult to see through' },
      { term: 'guide', definition: 'someone who leads or helps others' }
    ],
    choices: [
      { text: "Follow the Shadow to the Library.", nextScene: 'library', emotion: 'Courage' },
      { text: "Run away into the golden dust.", nextScene: 'garden', emotion: 'Fear' }
    ]
  },

  'kitchen': {
    id: 'kitchen',
    backgroundId: 'kitchen_warm',
    imageDescription: '[BACKGROUND: kitchen_warm]',
    lines: [
      { speaker: 'Narrator', text: "You head to the kitchen. The light here feels **tranquil** and safe." },
      { speaker: 'Mrs. Gable', text: "Good morning, dear! Isn't it a lovely and **peaceful** day?", character: 'Mrs. Gable | smiling | above textbox' },
      { speaker: 'Mrs. Gable', text: "The town’s heart is beating again, even if people do not notice.", character: 'Mrs. Gable | warm | above textbox' },
      { speaker: '{PlayerName}', text: "Do you know where that bell sound is coming from?" },
      { speaker: 'Mrs. Gable', text: "Take this gear. You may need it at the tower.", character: 'Mrs. Gable | kind | above textbox' }
    ],
    newWords: [
      { term: 'tranquil', definition: 'calm and peaceful' },
      { term: 'peaceful', definition: 'free from disturbance or stress' }
    ],
    choices: [
      { text: "Take the gear to the Clock Tower.", nextScene: 'tower', emotion: 'Bravery' },
      { text: "Go to the garden to think quietly.", nextScene: 'garden', emotion: 'Peace' }
    ]
  },

  'library': {
    id: 'library',
    backgroundId: 'library_dust',
    imageDescription: '[BACKGROUND: library_dust]',
    lines: [
      { speaker: 'Narrator', text: "The library is silent. Sunlight beams **illuminate** the floating dust." },
      { speaker: 'Umbrella Girl', text: "The books here do not contain words, {PlayerName}.", character: 'Umbrella Girl | neutral | above textbox' },
      { speaker: 'Umbrella Girl', text: "They hold memories instead. Some are forgotten on purpose.", character: 'Umbrella Girl | neutral | above textbox' }
    ],
    newWords: [
      { term: 'illuminate', definition: 'to light up or make something clear' }
    ],
    ending: {
      title: "The Eternal Archivist",
      type: 'Good',
      message: "You uncovered the town’s hidden history through silent memories."
    }
  },

  'tower': {
    id: 'tower',
    backgroundId: 'tower_stars',
    imageDescription: '[BACKGROUND: tower_stars]',
    lines: [
      { speaker: 'Narrator', text: "The clock tower rises toward the stars, ancient and **majestic**." },
      { speaker: 'Narrator', text: "The golden gears hum with **ancient** life and harmony." }
    ],
    newWords: [
      { term: 'majestic', definition: 'beautiful and powerful in an impressive way' },
      { term: 'ancient', definition: 'very old, from a long time ago' }
    ],
    ending: {
      title: "The Great Harmonizer",
      type: 'True',
      message: "You repaired the town’s heart and restored its lost music."
    }
  },

  'garden': {
    id: 'garden',
    backgroundId: 'garden_sunny',
    imageDescription: '[BACKGROUND: garden_sunny]',
    lines: [
      { speaker: 'Narrator', text: "The garden is filled with blooming roses. Time feels **still** here." },
      { speaker: 'Narrator', text: "For a moment, the world seems simple and complete." }
    ],
    newWords: [
      { term: 'still', definition: 'calm and without movement or noise' }
    ],
    ending: {
      title: "The Quiet Dreamer",
      type: 'Neutral',
      message: "You chose peace over answers, resting beneath the endless sun."
    }
  }
};