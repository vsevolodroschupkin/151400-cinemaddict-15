import Abstract from './abstract.js';

const createMainNavItem = (filter, currentFilterType) => {
  const {type, count, title } = filter;

  const itemCount = type === 'all' ? '' : ` <span class="main-navigation__item-count">${count}</span>`;

  const itemActiveClass = type === currentFilterType ? 'main-navigation__item--active' : '';

  return `<a
    href="#${type}"
    class="main-navigation__item ${itemActiveClass}"
    data-filter-type="${type}"
    data-menu-type="movies"
    >${title}${itemCount}
    </a>`;
};

const createMainNavTemplate = (filters, currentFilterType) => {

  const navigationItemsTemplate = filters
    .map((filter) => createMainNavItem(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navigationItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional" data-menu-type="statistics">Stats</a>
  </nav>`;
};

export default class MainNav extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._mainMenuChangeHandler = this._mainMenuChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  _mainMenuChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.mainMenuChange(evt.target.dataset.menuType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;

    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this._filterTypeChangeHandler);
  }

  setMainMenuChangeHandler(callback) {
    this._callback.mainMenuChange = callback;

    this.getElement().addEventListener('click', this._mainMenuChangeHandler);
  }
}
