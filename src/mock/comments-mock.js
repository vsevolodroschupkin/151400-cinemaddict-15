import { getRandomInteger } from '../utils/getRandomInteger.js';
import { getRandomArrayElement } from '../utils/getRandomArrayElement.js';
import { getRandomDate } from '../utils/getRandomDate.js';

const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 5;
const COMMENTS = [
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'what a fantastic movie',
  'Huh! Nothing interesting.Lost my time',
];
const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const generateCommentEmotion = getRandomArrayElement(EMOTIONS);
const generateCommentText = getRandomArrayElement(COMMENTS);

let commentId = 0;
const generateComment = () => (
  {
    id: commentId++,
    author: 'Author Name',
    comment: generateCommentText(),
    date: getRandomDate(),
    emotion: generateCommentEmotion(),
  }
);

export const generateCommentsArray = () => {
  const commentsQuantity = getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT);
  return new Array(commentsQuantity).fill().map(() => generateComment());
};

export const commentsArray = generateCommentsArray();
