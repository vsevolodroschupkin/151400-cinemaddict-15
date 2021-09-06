import Abstract from './abstract.js';
import { SORT_TYPE } from '../const.js';

const createSortingTemplate = (sortType) => {
  const sortDefaultActiveClass = sortType === SORT_TYPE.DEFAULT ? 'sort__button--active' : '';
  const sortDateActiveClass = sortType === SORT_TYPE.DATE_DESC ? 'sort__button--active' : '';
  const sortRatingtActiveClass = sortType === SORT_TYPE.RATING_DESC ? 'sort__button--active' : '';

  return `<ul class="sort">
    <li><a href="#" class="sort__button ${sortDefaultActiveClass}"  data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${sortDateActiveClass}" data-sort-type="${SORT_TYPE.DATE_DESC}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sortRatingtActiveClass}" data-sort-type="${SORT_TYPE.RATING_DESC}">Sort by rating</a></li>
  </ul>`;
};

export default class Sorting extends Abstract {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._sortType);
  }

  _sortTypeChangeHandler(evt) {
    if(evt.target.tagName !== 'A'){
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

}

