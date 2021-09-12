import { FILTER_TYPE } from '../const.js';
import AbstactObserver from '../utils/abstract-observer.js';

export default class Filter extends AbstactObserver {
  constructor() {
    super();

    this._activeFilter = FILTER_TYPE.ALL_MOVIES;
  }

  setFilter(updateType, filter) {
    this._activeFilter =  filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
