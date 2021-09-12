import { FILTER_TYPE } from '../const.js';
import Abstract from './abstract.js';

const NO_MOVIE_TEXT_TYPE = {
  [FILTER_TYPE.ALL_MOVIES]: 'There are no movies in our database',
  [FILTER_TYPE.WATCHLIST]: 'There are no movies to watch now',
  [FILTER_TYPE.HISTORY]: 'There are no watched movies now',
  [FILTER_TYPE.FAVORITES]: 'There are no favorite movies now',
};

const createNoMoviesTemplate = (filterType) => {

  const message = NO_MOVIE_TEXT_TYPE[filterType];

  return `<section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section> `;
};

export default class NoMovies extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoMoviesTemplate(this._data);
  }
}
