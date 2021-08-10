import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/getRandomInteger.js';
import { getRandomArrayElement } from '../utils/getRandomArrayElement.js';
import { EMOTIONS } from '../const.js';

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

const MAX_DAYS_GAP = 1000;
const MIN_DAYS_GAP = 0;

const generateCommentEmotion = () => getRandomArrayElement(EMOTIONS);
const generateCommentText = () => getRandomArrayElement(COMMENTS);
const generateAuthor = () => getRandomArrayElement(AUTHORS);
const generateCommentDate = () => dayjs().add(getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP), 'days').toDate() ;

let commentId = 0;

const generateComment = () => (
  {
    id: commentId++,
    author: generateAuthor(),
    comment: generateCommentText(),
    date: generateCommentDate(),
    emotion: generateCommentEmotion(),
  }
);

export const generateCommentsArray = () => {
  const commentsQuantity = getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT);
  return new Array(commentsQuantity).fill().map(() => generateComment());
};
//.substract(getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP), 'day').toDate()
