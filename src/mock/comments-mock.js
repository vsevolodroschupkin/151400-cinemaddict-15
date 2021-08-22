import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common/getRandomInteger.js';
import { getRandomArrayElement } from '../utils/common/getRandomArrayElement.js';
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

// TODO: Вынести в модуль dates.js функцию addDaysToDate(date, daysCount), чтобы dayjs был только в одном модуле
const generateCommentDate = () => dayjs().add(getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP), 'days').toDate() ;

let commentId = 0;

const generateComment = () => (
  {
    id: commentId++,
    // TODO: Можно не делать отдельную фунцию generateAuthor, вставить сразу getRandomArrayElement
    author: generateAuthor(),
    comment: generateCommentText(),
    date: generateCommentDate(),
    emotion: generateCommentEmotion(),
  }
);

// TODO: Не нужно писать тип данных 'Array'
export const generateCommentsArray = () => {
  const commentsQuantity = getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT);
  // TODO: Можно просто передать функцию generateComment
  return new Array(commentsQuantity).fill().map(() => generateComment());
};

// TODO: Удалить закомментированный код
//.substract(getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP), 'day').toDate()

// TODO: убрать mock из наименования файла, т.к есть есть название папки
