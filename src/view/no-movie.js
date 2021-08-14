import { createElement } from '../utils/createElement.js';

const createNoMovieTemplate = (filter) => {
  const { name } = filter;

  let message;

  switch (name) {
    case 'all' :
      message = 'There are no movies in our database';
      break;
    case 'watchlist' :
      message = 'There are no movies to watch now';
      break;
    case 'history' :
      message = 'There are no watched movies now';
      break;
    case 'favirotes' :
      message = 'There are no favorite movies now';
      break;
  }

  return `<section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section> `;
};

export default class NoMovie {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createNoMovieTemplate(this._filter);
  }

  getElement() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }
  }

  removeTemplate() {
    this._element = null;
  }
}
