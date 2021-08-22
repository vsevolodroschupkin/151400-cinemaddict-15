import { getRandomInteger } from '../utils/common/getRandomInteger.js';
import { getRandomFloat } from '../utils/common/getRandomFloat.js';
import { getRandomArrayElement } from '../utils/common/getRandomArrayElement.js';
import { generateCommentsArray } from './comments-mock.js';
import { getRandomBoolean } from '../utils/common/getRandomBoolean.js';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
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
const MAX_SCORE = 10;
const MIN_SCORE = 0;
const SCORE_DIGIT = 1;
const MIN_RUNTIME = 1;
const MAX_RUNTIME = 1000;

// TODO: Можно объединить константы в перечисление
// const Runtime = {MIX: 1, MAX: 1000}
// есть критерий, но моки все равно удалятся, так что не критично
// Б16. Сложные составные константы собираются в перечисления Enum.

// TODO: RELEASE_DATE_FROM, RELEASE_DATE_TO
const MOVIE_START_YEAR = '1895';
const MOVIE_END_YEAR = '2021';

// TODO: Лучше назвать generateReleaseDate
const generateRandomDate = () => new Date(getRandomInteger(MOVIE_START_YEAR, MOVIE_END_YEAR),getRandomInteger(0, 11), getRandomInteger(0, 28));

const generateScore = () => (getRandomFloat(MAX_SCORE, MIN_SCORE, SCORE_DIGIT));

// TODO: getRandomArrayElement вместо getRandomInteger
const generatePosterUrl = () => (`./images/posters/${POSTERS[getRandomInteger(0, POSTERS.length - 1)]}`);

const generateDescription = () => {
  const description = [];
  const phraseCount = getRandomInteger(1, 5);

  for (let i = 1; i <= phraseCount; i++) {
    const phraseItem = getRandomArrayElement(DESCRIPTION_PHRASES);
    description.push(phraseItem);
  }

  return description.join(' ');

  // TODO: в одно действие, 5 - можно в константу
  // return new Array(getRandomInteger(1, 5)).fill()
  //   .map(() => getRandomArrayElement(DESCRIPTION_PHRASES))
  //   .join(' ');
};

// TODO: не нужны отдельные однострочные функции, можно сразу в generateMovie
const generateRuntime = () => getRandomInteger(MIN_RUNTIME, MAX_RUNTIME);

const generateCountry = () => getRandomArrayElement(COUNTRIES);

const generateAgeRating = () => getRandomArrayElement(AGE_RATINGS);

let movieId = MOVIE_START_ID;

const generateMovie = () => (
  {
    id: movieId++,
    comments: [],
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
        date: generateRandomDate(),
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
      watchlist: getRandomBoolean(),
      alreadyWatched: getRandomBoolean(),
      watchingDate: 'generateDate()',
      favorite: getRandomBoolean(),
    },
  }
);

// TODO: Удалить Array из наименования функции
export const generateMoviesArray = (count) => new Array(count).fill().map(generateMovie);

// TODO: перенести в файл movies.js или comments.js
// моки со временем удалятся, а эта функция понадобится
export const getMovieComments = (movie, comments) => {
  const commentIds = movie.comments;
  return comments.filter((item) => commentIds.includes(item.id));
};

export const generateCommentsForMovies = (movies) => {
  let comments = [];
  movies.forEach((it) => {
    const movieComments = generateCommentsArray();
    it.comments = movieComments.map((comment) => comment.id);
    comments = [...comments, ... movieComments];
  });
  return comments;
};

// TODO: халтура с генерацией жанров, авторов =)
// TODO: убрать mock из наименования файла, т.к есть есть название папки
