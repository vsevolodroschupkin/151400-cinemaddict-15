import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import { getRandomInteger, getRandomFloat } from '../utils.js';
import { POSTERS, AGE_RATINGS, DESCRIPTION_PHRASES, EMOTIONS, COUNTRIES, MOVIE_MIN_ID, MOVIE_MAX_ID, MAX_SCORE, MIN_SCORE, SCORE_DIGIT, MIN_RUNTIME, MAX_RUNTIME, MOVIE_START_DATE, COMMENT_MIN_ID, COMMENT_MAX_ID,COMMENT_MIN_QNTY, COMMENT_MAX_QNTY } from '../const.js';

dayjs.extend(dayjsRandom);


const generateMovieId = () => (getRandomInteger(MOVIE_MIN_ID, MOVIE_MAX_ID));

const generateScore = () => (getRandomFloat(MAX_SCORE, MIN_SCORE, SCORE_DIGIT));

const generatePosterUrl = () => (`./images/posters/${POSTERS[getRandomInteger(0, POSTERS.length - 1)]}`);

const generateDescription = () => {
  const description = [];
  const phraseCount = getRandomInteger(1, 5);

  for (let i = 1; i <= phraseCount; i++) {
    const phraseItem = DESCRIPTION_PHRASES[getRandomInteger(0, DESCRIPTION_PHRASES.length - 1)];
    description.push(phraseItem);
  }

  return description.join(' ');
};

const generateRuntime = () => (getRandomInteger(MIN_RUNTIME, MAX_RUNTIME));

const generateDate = () => (dayjs.between(MOVIE_START_DATE, dayjs()).format());

const generateCountry = () => (COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)]);

const generateCommentEmotion = () => (EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)]);


const generateComment = () => (
  {
    id: getRandomInteger(COMMENT_MIN_ID, COMMENT_MAX_ID),
    author: 'Author Name',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '',
    emotion: generateCommentEmotion(),
  }
);

const generateCommentsArray = () => {
  const commentsQuantity = getRandomInteger(COMMENT_MIN_QNTY, COMMENT_MAX_QNTY);
  return new Array(commentsQuantity).fill().map(() => generateComment());
};

const generateAgeRating = () => (AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length - 1)]);

export const generateMovie = () => (
  {
    id: generateMovieId(),
    comments: generateCommentsArray().map((it) => it.id),
    filmInfo: {
      title: 'Tenet',
      alternativeTitle: 'Movie alternative title',
      totalRating: generateScore(),
      poster: generatePosterUrl(),
      ageRating: generateAgeRating(),
      director: 'Directors name',
      writers: [
        'writer1',
        'writer2',
        'writer3',
      ],
      actors: [
        'actor1',
        'actor2',
        'actor3',
      ],
      release: {
        date: generateDate(),
        releaseCountry: generateCountry(),
      },
      runtime: generateRuntime(),
      genre:[
        'Animation',
        'Horror',
        'Action',
      ],
      description: generateDescription(),

    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateDate(),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  }
);
