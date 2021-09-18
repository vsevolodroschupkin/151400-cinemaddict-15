import { addDaysToDate } from '../utils/dates.js';
import { getRandomInteger, getRandomArrayElement } from '../utils/random.js';

const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 5;
const COMMENTS = [
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'what a fantastic movie',
  'Huh! Nothing interesting.Lost my time',
];
const AUTHORS = [
  'Tony Hawk',
  'Little Buster',
  'The Great Emperor',
];
export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const DAYS_GAP = 7;

const generateCommentDate = () => addDaysToDate(new Date().getDay(), getRandomInteger(0, DAYS_GAP)) ;

let commentId = 0;

export const generateComment = () => (
  {
    id: commentId++,
    author: getRandomArrayElement(AUTHORS),
    comment: getRandomArrayElement(COMMENTS),
    date: generateCommentDate(),
    emotion: getRandomArrayElement(EMOTIONS),
  }
);

export const generateComments = () => {
  const commentsQuantity = getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT);
  return new Array(commentsQuantity).fill().map(generateComment);
};
