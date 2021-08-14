import { createElement } from '../utils/createElement.js';

const createMainNavItem = (filter) => {
  const {name, count} = filter;

  let itemName = '';
  switch (name) {
    case 'all' :
      itemName = 'All Movies';
      break;
    case 'watchlist':
      itemName = 'Watchlist';
      break;
    case 'history':
      itemName = 'History';
      break;
    case 'favorites':
      itemName = 'Favorites';
      break;
  }

  const itemCount = name === 'all' ? '' : ` <span class="main-navigation__item-count">${count}</span>`;

  return `<a
    href="#${name}"
    class="main-navigation__item main-navigation__item">${itemName}${itemCount}
    </a>`;
};

const createMainNavTemplate = (filters) => {

  const navigationItemsTemplate = filters
    .map((filter) => createMainNavItem(filter))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navigationItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNav {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainNavTemplate(this._filters);
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
