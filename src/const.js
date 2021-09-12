export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const USER_RANKS = {
  NOVICE: {
    title: 'Novice',
    min: 1,
  },
  FUN: {
    title: 'Fan',
    min: 11,
  },
  MOVIE_BUFF: {
    title: 'Movie Buff',
    min: 21,
  },
};

export const CARD_COUNT_PER_STEP = 5;
export const MOVIE_COUNT = 20;

export const CONTAINER_TITLES = {
  all: 'All movies. Upcoming',
};

export const SORT_TYPE = {
  DEFAULT: 'default',
  DATE_DESC: 'date-desc',
  RATING_DESC: 'rating-desc',
};

export const USER_ACTION = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FILTER_TYPE = {
  ALL_MOVIES: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};
