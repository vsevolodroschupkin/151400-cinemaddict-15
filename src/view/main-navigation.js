import Abstract from './abstract.js';

const createMainNavItem = (filter) => {
  const {name, count, title } = filter;

  const itemCount = name === 'all' ? '' : ` <span class="main-navigation__item-count">${count}</span>`;

  return `<a
    href="#${name}"
    class="main-navigation__item main-navigation__item">${title}${itemCount}
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

export default class MainNav extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavTemplate(this._filters);
  }

}
