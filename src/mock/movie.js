import { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomBoolean } from '../utils/random.js';
import { generateComments } from './comments.js';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
];
const GENRES = [
  'Animation',
  'Horror',
  'Action',
];
const COUNTRIES = [
  'USA',
  'Japan',
  'Great Britain',
  'Turkey',
  'Sweden',
];
const AGE_RATINGS = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];
const DESCRIPTION_PHRASES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];
const MOVIE_START_ID = 1;

const RUNTIME = {
  MIN: 1,
  MAX: 1000,
};

const SCORE = {
  MAX: 10,
  MIN: 0,
  DIGITS: 1,
};

const RELEASE_DATE_FROM = '1895';
const RELEASE_DATE_TO = '2021';

const generateReleaseDate = () => new Date(getRandomInteger(RELEASE_DATE_FROM, RELEASE_DATE_TO),getRandomInteger(0, 11), getRandomInteger(0, 28));

const generatePosterUrl = () => (`./images/posters/${getRandomArrayElement(POSTERS).toString()}`);

const generateDescription = () => new Array(getRandomInteger(1, 5)).fill()
  .map(() => getRandomArrayElement(DESCRIPTION_PHRASES))
  .join(' ');

const generateGenres = () => new Array(getRandomInteger(1, GENRES.length - 1)).fill()
  .map(() => getRandomArrayElement(GENRES))
  .join(', ');

let movieId = MOVIE_START_ID;

const generateMovie = () => (
  {
    id: movieId++,
    comments: [],
    filmInfo: {
      title: 'Tenet',
      alternativeTitle: 'Movie alternative title',
      totalRating: (getRandomFloat(SCORE.MAX, SCORE.MIN, SCORE.DIGITS)),
      poster: generatePosterUrl(),
      ageRating: getRandomArrayElement(AGE_RATINGS),
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
        date: generateReleaseDate(),
        releaseCountry: getRandomArrayElement(COUNTRIES),
      },
      runtime: getRandomInteger(RUNTIME.MIN, RUNTIME.MAX),
      genre: generateGenres(),
      description: generateDescription(),

    },
    userDetails: {
      watchlist: getRandomBoolean(),
      alreadyWatched: getRandomBoolean(),
      watchingDate: generateReleaseDate(),
      favorite: getRandomBoolean(),
    },
  }
);

export const generateMovies = (count) => new Array(count).fill().map(generateMovie);

export const generateCommentsForMovies = (movies) => {
  let comments = [];
  movies.forEach((it) => {
    const movieComments = generateComments();
    it.comments = movieComments.map((comment) => comment.id);
    comments = [...comments, ... movieComments];
  });
  return comments;
};

// TODO: халтура с генерацией жанров, авторов =)
