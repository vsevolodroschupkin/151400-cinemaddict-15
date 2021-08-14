import { createElement } from '../utils/createElement.js';

const createFooterStatisticsTemplate = (number) => (
  `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`
);

export default class FooteStatistics {
  constructor(number) {
    this._element = null;
    this._number = number;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._number);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
