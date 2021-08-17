import { createElement } from '../utils/createElement.js';

const createNoMovieTemplate = () => {

  const message = 'message about no movies';

  return `<section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section> `;
};

export default class NoMovie {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoMovieTemplate();
  }

  getElement() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeTemplate() {
    this._element = null;
  }
}
