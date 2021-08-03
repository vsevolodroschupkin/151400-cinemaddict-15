const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomFloat (min, max, digits) {
  if (max === min) {
    return 'Начало и конец диапазона равны. Вызовите функцию с другими аргументами.';
  }
  if (max < 0 || min < 0) {
    return 'Диапазон может быть только положительным';
  }
  if (min > max) {
    const count = max;
    max = min;
    min = count;
  }
  // eslint-disable-next-line prefer-template
  const number = Math.min(min + (Math.random() * (max - min + parseFloat('1e-' + ((Math.random() + '').length - 1)))), max);
  return parseFloat(number.toFixed(digits));
};

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg'
];

const DESCRIPTION_PHRASES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const MAX_SCORE = 10;
const MIN_SCORE = 0;
const SCORE_DIGIT = 1;

const generateScore = () => (getRandomFloat(MAX_SCORE, MIN_SCORE, SCORE_DIGIT));

const generatePosterUrl = () => {
  return `./images/posters/${POSTERS[getRandomInteger(0, POSTERS.length - 1)]}`
};

const generateDescription = () => {
  const description = [];
  const phraseCount = getRandomInteger(1, 5);

  for (let i = 1; i <= phraseCount; i++) {
    const phraseItem = DESCRIPTION_PHRASES[getRandomInteger(0, DESCRIPTION_PHRASES.length - 1)];
    description.push(phraseItem);
  }

  return description.join(' ');
};

const generateCommentEmotion = () => {
  return EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)]
};


const generateComment = () => {
  return {
    id: 42,
    author: 'Author Name',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '',
    emotion: generateCommentEmotion(),
  }
};

export const generateMovie = () => {
  return {
    id: 0,
    comments: [
      1
    ],
    film_info: {
      title: 'Tenet',
      alternative_title: 'Movie alternative tite',
      total_rating: generateScore(),
      poster: generatePosterUrl(),
      age_rating: 16,
      director: 'Directors name',
      writers: [
        'writer1',
        'writer2',
        'writer3'
      ],
      actors: [
        'actor1',
        'actor2',
        'actor3'
      ],
      release: {
        date: '',
        release_country: 'USA',
      },
      runtime: 125,
      genre:[
        'Animation',
        'Horror',
        'Action'
      ],
      description: generateDescription(),

    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: 'watching date',
      favorite: false
    }
  }
};
