import MainNavView from '../view/main-navigation.js';
import { render, remove, replace, RenderPosition } from '../utils/render.js';
import { filter } from '../utils/filters.js';
import { UPDATE_TYPE, FILTER_TYPE } from '../const.js';

export default class Filter {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new MainNavView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if(prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if(this._filterModel.getFilter() === filterType){
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FILTER_TYPE.ALL_MOVIES,
        count: filter[FILTER_TYPE.ALL_MOVIES](movies).length,
        title: 'All Movies',
      },
      {
        type: FILTER_TYPE.WATCHLIST,
        count: filter[FILTER_TYPE.WATCHLIST](movies).length,
        title: 'Watchlist',
      },
      {
        type: FILTER_TYPE.HISTORY,
        count: filter[FILTER_TYPE.HISTORY](movies).length,
        title: 'History',
      },
      {
        type: FILTER_TYPE.FAVORITES,
        count: filter[FILTER_TYPE.FAVORITES](movies).length,
        title: 'Favorites',
      },
    ];
  }


}
