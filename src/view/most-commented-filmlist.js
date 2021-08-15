import { createElement } from '../utils/createElement.js';

const createMostCommentedFilmlistTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class MostCommentedFilmlist {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmlistTemplate();
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
