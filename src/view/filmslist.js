import { createElement } from '../utils/createElement.js';

const creatFilmslistTemplate = (title, isExtra) => {
  const listTitle = title;
  const listExtraClass = isExtra ? 'films-list--extra' : '';
  const hiddenClass = !isExtra ? 'visually-hidden' : '';

  return `<section class="films-list ${listExtraClass}">
    <h2 class="films-list__title ${hiddenClass}">${listTitle}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class Filmslist {
  constructor(title, isExtra) {
    this._element = null;
    this._title = title;
    this._isExtra = isExtra;
    this._container = null;
  }

  getTemplate() {
    return creatFilmslistTemplate(this._title, this._isExtra);
  }

  getElement() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getContainer() {
    return this.getElement().querySelector('.films-list__container');
  }

  removeTemplate() {
    this._element = null;
  }
}
