import { createElement } from '../utils/createElement.js';

const createContentTemplate = () => (
  `<section class="films">
  </section>`
);

export default class Content {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContentTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
