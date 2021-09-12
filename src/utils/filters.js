import { FILTER_TYPE } from '../const.js';

export const filter = {
  [FILTER_TYPE.ALL_MOVIES]: (movies) => movies,
  [FILTER_TYPE.WATCHLIST]: (movies) => movies.filter((movie) => (movie.userDetails.watchlist === true)),
  [FILTER_TYPE.HISTORY]: (movies) => movies.filter((movie) => (movie.userDetails.alreadyWatched === true)),
  [FILTER_TYPE.FAVORITES]: (movies) => movies.filter((movie) => (movie.userDetails.favorite === true)),
};


