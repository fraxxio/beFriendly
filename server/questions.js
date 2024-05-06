import { createHash } from 'crypto';
import seedrandom from 'seedrandom';

// Return 10 random questions array
export function getRandomQuestions(roomName) {
  const seed = createHash('md5').update(roomName).digest('hex');
  seedrandom(seed);
  const randomQuestionArray = [];

  while (randomQuestionArray.length < 10) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    if (!randomQuestionArray.includes(randomQuestion)) {
      randomQuestionArray.push(randomQuestion);
    }
  }

  return randomQuestionArray;
}

const questions = [
  {
    question: 'Would you rather travel to the past or the future?',
    answer1: 'Past',
    answer2: 'Future',
  },
  {
    question: 'Do you prefer summer or winter?',
    answer1: 'Summer',
    answer2: 'Winter',
  },
  {
    question: 'Which superpower would you rather have: flight or invisibility?',
    answer1: 'Flight',
    answer2: 'Invisibility',
  },
  {
    question: 'Would you rather explore space or the ocean?',
    answer1: 'Space',
    answer2: 'Ocean',
  },
  {
    question: 'Do you prefer cats or dogs?',
    answer1: 'Cats',
    answer2: 'Dogs',
  },
  {
    question: 'Would you rather be a famous actor or a successful entrepreneur?',
    answer1: 'Famous actor',
    answer2: 'Successful entrepreneur',
  },
  {
    question: 'Do you like to read fiction or non-fiction?',
    answer1: 'Fiction',
    answer2: 'Non-fiction',
  },
  {
    question: 'Would you rather live in a big city or a small town?',
    answer1: 'Big city',
    answer2: 'Small town',
  },
  {
    question: 'Do you prefer sweet or savory snacks?',
    answer1: 'Sweet',
    answer2: 'Savory',
  },
  {
    question: 'Which would you rather have: the ability to time travel or teleportation?',
    answer1: 'Time travel',
    answer2: 'Teleportation',
  },
  {
    question: 'Would you rather have the ability to fly or breathe underwater?',
    answer1: 'Fly',
    answer2: 'Breathe underwater',
  },
  {
    question: 'Do you prefer sunrise or sunset?',
    answer1: 'Sunrise',
    answer2: 'Sunset',
  },
  {
    question: 'Which do you enjoy more: cooking at home or dining out?',
    answer1: 'Cooking at home',
    answer2: 'Dining out',
  },
  {
    question: 'Would you rather have a rewind button for your life or a pause button?',
    answer1: 'Rewind button',
    answer2: 'Pause button',
  },
  {
    question: 'Do you prefer listening to music or podcasts?',
    answer1: 'Music',
    answer2: 'Podcasts',
  },
  {
    question: 'Would you rather be a famous musician or a famous actor?',
    answer1: 'Famous musician',
    answer2: 'Famous actor',
  },
  {
    question: 'Do you prefer indoor activities or outdoor activities?',
    answer1: 'Indoor activities',
    answer2: 'Outdoor activities',
  },
  {
    question:
      'Which would you rather have: the ability to speak all languages or the ability to communicate with animals?',
    answer1: 'Speak all languages',
    answer2: 'Communicate with animals',
  },
  {
    question: "Do you enjoy surprises or do you prefer to know what's coming?",
    answer1: 'Enjoy surprises',
    answer2: "Prefer to know what's coming",
  },
  {
    question: 'Would you rather live in a treehouse or a houseboat?',
    answer1: 'Treehouse',
    answer2: 'Houseboat',
  },
  {
    question: 'Do you prefer tea or coffee?',
    answer1: 'Tea',
    answer2: 'Coffee',
  },
  {
    question: 'Would you rather have the ability to teleport or time travel?',
    answer1: 'Teleport',
    answer2: 'Time travel',
  },
  {
    question: 'Do you prefer movies or TV shows?',
    answer1: 'Movies',
    answer2: 'TV shows',
  },
  {
    question: 'Would you rather have the power of telekinesis or telepathy?',
    answer1: 'Telekinesis',
    answer2: 'Telepathy',
  },
  {
    question: 'Do you prefer sweet or savory breakfast foods?',
    answer1: 'Sweet',
    answer2: 'Savory',
  },
  {
    question: 'Would you rather live in a castle or a beach house?',
    answer1: 'Castle',
    answer2: 'Beach house',
  },
  {
    question: 'Do you prefer video games or board games?',
    answer1: 'Video games',
    answer2: 'Board games',
  },
  {
    question:
      'Would you rather have the ability to speak every language fluently or play every musical instrument proficiently?',
    answer1: 'Speak every language fluently',
    answer2: 'Play every musical instrument proficiently',
  },
  {
    question: 'Do you prefer to travel alone or with others?',
    answer1: 'Alone',
    answer2: 'With others',
  },
  {
    question: 'Would you rather have unlimited money or unlimited time?',
    answer1: 'Unlimited money',
    answer2: 'Unlimited time',
  },
  {
    question: 'Do you prefer reading fiction or watching movies?',
    answer1: 'Reading fiction',
    answer2: 'Watching movies',
  },
  {
    question:
      'Would you rather have the ability to speak to animals or to speak all foreign languages?',
    answer1: 'Speak to animals',
    answer2: 'Speak all foreign languages',
  },
  {
    question: 'Do you prefer hiking in the mountains or lounging on the beach?',
    answer1: 'Hiking in the mountains',
    answer2: 'Lounging on the beach',
  },
  {
    question: 'Would you rather have the power of super strength or the power of flight?',
    answer1: 'Super strength',
    answer2: 'Flight',
  },
  {
    question: 'Do you prefer to plan everything or be spontaneous?',
    answer1: 'Plan everything',
    answer2: 'Be spontaneous',
  },
  {
    question: 'Would you rather be able to control fire or water?',
    answer1: 'Control fire',
    answer2: 'Control water',
  },
  {
    question: 'Do you prefer to stay up late or wake up early?',
    answer1: 'Stay up late',
    answer2: 'Wake up early',
  },
  {
    question: 'Would you rather have the power of invisibility or the power of teleportation?',
    answer1: 'Invisibility',
    answer2: 'Teleportation',
  },
  {
    question: 'Do you prefer to spend your free time indoors or outdoors?',
    answer1: 'Indoors',
    answer2: 'Outdoors',
  },
  {
    question: 'Would you rather have the ability to control time or space?',
    answer1: 'Control time',
    answer2: 'Control space',
  },
  {
    question: 'Do you prefer classical music or modern pop?',
    answer1: 'Classical music',
    answer2: 'Modern pop',
  },
  {
    question:
      'Would you rather be able to talk to plants or to be able to understand any language spoken by humans?',
    answer1: 'Talk to plants',
    answer2: 'Understand any language spoken by humans',
  },
  {
    question: 'Do you prefer to work in a team or independently?',
    answer1: 'Work in a team',
    answer2: 'Work independently',
  },
  {
    question: 'Would you rather have the power of mind reading or the power of time manipulation?',
    answer1: 'Mind reading',
    answer2: 'Time manipulation',
  },
  {
    question: 'Do you prefer to explore new places or revisit familiar ones?',
    answer1: 'Explore new places',
    answer2: 'Revisit familiar ones',
  },
  {
    question: 'Would you rather be a famous athlete or a famous artist?',
    answer1: 'Famous athlete',
    answer2: 'Famous artist',
  },
  {
    question: 'Do you prefer spicy food or mild food?',
    answer1: 'Spicy food',
    answer2: 'Mild food',
  },
  {
    question: 'Would you rather have the ability to control the weather or know the future?',
    answer1: 'Control the weather',
    answer2: 'Know the future',
  },
  {
    question: 'Do you prefer to dress casually or formally?',
    answer1: 'Casually',
    answer2: 'Formally',
  },
  {
    question: 'Would you rather be able to speak to machines or to animals?',
    answer1: 'Speak to machines',
    answer2: 'Speak to animals',
  },
];
