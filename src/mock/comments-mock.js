import { getRandomInteger } from '../utils/getRandomInteger.js';
import { getRandomArrayElement } from '../utils/getRandomArrayElement.js';
import { getRandomDate } from '../utils/getRandomDate.js';
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


const generateCommentEmotion = () => getRandomArrayElement(EMOTIONS);
const generateCommentText = () => getRandomArrayElement(COMMENTS);
const generateAuthor = () => getRandomArrayElement(AUTHORS);

let commentId = 0;

const generateComment = () => (
  {
    id: commentId++,
    author: generateAuthor(),
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
