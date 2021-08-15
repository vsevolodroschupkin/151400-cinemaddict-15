import { createElement } from '../utils/createElement.js';

const createTopRatedFilmlistTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class TopRatedFilmlist {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmlistTemplate();
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
