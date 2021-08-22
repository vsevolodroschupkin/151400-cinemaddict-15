import Abstract from './abstract.js';

const creatFilmslistTemplate = (title, isExtra) => {
  const listTitle = title;
  const listExtraClass = isExtra ? 'films-list--extra' : '';
  const hiddenClass = !isExtra ? 'visually-hidden' : '';

  return `<section class="films-list ${listExtraClass}">
    <h2 class="films-list__title ${hiddenClass}">${listTitle}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class Filmslist extends Abstract {
  constructor(title, isExtra) {
    super();
    this._title = title;
    this._isExtra = isExtra;
    this._container = null;
  }

  getTemplate() {
    return creatFilmslistTemplate(this._title, this._isExtra);
  }

  getContainer() {
    return this.getElement().querySelector('.films-list__container');
  }

}

// TODO: имя класса - MoviesList
// TODO: имя файла - movies-list.js
// TODO: creatFilmslistTemplate=>creatMoviesListTemplate
