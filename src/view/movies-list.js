import Abstract from './abstract.js';

const creatMovieslistTemplate = (title, isExtra = false) => {
  const listTitle = title;
  const listExtraClass = isExtra ? 'films-list--extra' : '';
  const hiddenClass = !isExtra ? 'visually-hidden' : '';

  return `<section class="films-list ${listExtraClass}">
    <h2 class="films-list__title ${hiddenClass}">${listTitle}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class MoviesList extends Abstract {
  constructor(title, isExtra) {
    super();
    this._title = title;
    this._isExtra = isExtra;
    this._container = null;
  }

  getTemplate() {
    return creatMovieslistTemplate(this._title, this._isExtra);
  }

  getContainer() {
    return this.getElement().querySelector('.films-list__container');
  }

}
