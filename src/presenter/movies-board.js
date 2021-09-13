import MoviePresenter from './movie.js';
import SortingView from '../view/sorting.js';
import ContentView from '../view/content.js';
import MovieslistView from '../view/movies-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoMoviesView from '../view/no-movies.js';
import { RenderPosition, render, remove } from '../utils/render.js';
import { CARD_COUNT_PER_STEP, CONTAINER_TITLES, SORT_TYPE, UPDATE_TYPE, USER_ACTION, FILTER_TYPE } from '../const.js';
import { sortMoviesByDateDesc} from '../utils/dates.js';
import { sortMoviesByRatingDesc } from '../utils/movies.js';
import { filter } from '../utils/filters.js';
export default class MoviesBoard {
  constructor (moviesBoardContainer, moviesModel, commentsModel, filterModel){
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._moviesBoardContainer = moviesBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._moviePresenter = new Map();
    this._currentSortType = SORT_TYPE.DEFAULT;
    this._filterType = FILTER_TYPE.ALL_MOVIES;
    this._openedMovie = null;
    this._popupScrollPosition = 0;

    this._sortingComponent = null;
    this._showMoreButtonComponent = null;
    this._contentComponent = new ContentView();
    this._moviesListComponent = new MovieslistView(CONTAINER_TITLES.all);
    this._noMoviesComponent = null;

    this._setPopupScrollPosition = this._setPopupScrollPosition.bind(this);
    this._setOpenedMovie = this._setOpenedMovie.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getMovies() {
    this._filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filter[this._filterType](movies);

    switch (this._currentSortType) {
      case SORT_TYPE.DATE_DESC:
        return filteredMovies.slice().sort(sortMoviesByDateDesc);
      case SORT_TYPE.RATING_DESC:
        return filteredMovies.slice().sort(sortMoviesByRatingDesc);
    }

    return filteredMovies;
  }

  init() {
    this._renderBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case USER_ACTION.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case USER_ACTION.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._moviePresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearBoard({resetRenderedMovieCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._moviePresenter.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard({resetRenderedMovieCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if(this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._moviesBoardContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderContent() {
    render(this._moviesBoardContainer, this._contentComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getMovies().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);

    const movies = this._getMovies().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderMovieCards(movies);
    this._renderedCardCount = newRenderedCardCount;

    if ( this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if(this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    const moviesListContainer = this._moviesListComponent;
    this._showMoreButtonComponent = new ShowMoreButtonView();

    render(moviesListContainer, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderNoMovies() {
    this._noMoviesComponent = new NoMoviesView(this._filterType);
    render(this._contentComponent, this._noMoviesComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovieCard(movie) {
    const moviePresenter = new MoviePresenter(this._moviesListComponent.getContainer(), this._handleViewAction, this._handleModeChange, this._setOpenedMovie, this._setPopupScrollPosition);
    moviePresenter.init(movie, this._commentsModel.getComments());

    const isPopupOpen = this._openedMovie && this._openedMovie.id === movie.id;
    if(isPopupOpen) {
      moviePresenter.restoreOpenedPopup(this._popupScrollPosition);
    }

    this._moviePresenter.set(movie.id, moviePresenter);
  }

  _setOpenedMovie(movie) {
    this._openedMovie = movie;
  }

  _setPopupScrollPosition(scrollPosition) {
    this._popupScrollPosition = scrollPosition;
  }

  _renderMovieCards(movies) {
    movies.forEach((movie) => this._renderMovieCard(movie));
  }

  _renderMoviesList() {
    const cardsCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(cardsCount, this._renderedCardCount));

    render(this._contentComponent, this._moviesListComponent, RenderPosition.BEFOREEND);

    this._renderMovieCards(movies);

    if (cardsCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
  }

  _clearBoard({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const movieCount = this._getMovies().length;

    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this._moviePresenter.clear();

    remove(this._sortingComponent);

    if(this._noMoviesComponent) {
      remove(this._noMoviesComponent);
    }

    remove(this._showMoreButtonComponent);

    if (resetRenderedMovieCount) {
      this._renderedCardCount = CARD_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(movieCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SORT_TYPE.DEFAULT;
    }

  }

  _renderMoviesBoard() {
    const movies = this._getMovies();
    const cardCount = movies.length;

    if (cardCount === 0) {
      this._renderNoMovies();
      return;
    }

    this._renderMoviesList();
  }

  _renderBoard() {
    this._renderSort();
    this._renderContent();
    this._renderMoviesBoard();
  }

}
