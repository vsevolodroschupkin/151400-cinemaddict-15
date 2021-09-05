import MoviePresenter from './movie.js';
import SortingView from '../view/sorting.js';
import ContentView from '../view/content.js';
import MovieslistView from '../view/movies-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoMoviesView from '../view/no-movies.js';
import { RenderPosition, render, remove } from '../utils/render.js';
import { CARD_COUNT_PER_STEP, CONTAINER_TITLES } from '../const.js';
import { updateItem } from '../utils/common.js';
export default class MoviesBoard {
  constructor (moviesBoardContainer){
    this._moviesBoardContainer = moviesBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._moviePresenter = new Map();

    this._sortingComponent = new SortingView();
    this._contentComponent = new ContentView();
    this._moviesListComponent = new MovieslistView(CONTAINER_TITLES.all);
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noMoviesComponent = new NoMoviesView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

  }

  init(movies, comments) {
    this._movies = movies.slice();
    this._comments = comments.slice();

    this._renderSort();
    this._renderContent();
    this._renderMoviesBoard();

  }

  _handleCardChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._moviePresenter.get(updatedMovie.id).init(updatedMovie, this._comments);
  }

  _handleModeChange() {
    this._moviePresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._moviesBoardContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderContent() {
    render(this._moviesBoardContainer, this._contentComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderMovieCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);
    this._renderedCardCount += CARD_COUNT_PER_STEP;

    if ( this._renderedCardCount >= this._movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    const moviesListContainer = this._moviesListComponent;
    const showMoreButtonComponent = this._showMoreButtonComponent;

    render(moviesListContainer, showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderNoMovies() {
    render(this._contentComponent, this._noMoviesComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovieCard(movie) {
    const moviePresenter = new MoviePresenter(this._moviesListComponent.getContainer(), this._handleCardChange, this._handleModeChange);
    moviePresenter.init(movie, this._comments);
    this._moviePresenter.set(movie.id, moviePresenter);
  }

  _renderMovieCards(from, to) {
    this._movies
      .slice(from, to)
      .forEach((movie) => this._renderMovieCard(movie));
  }

  _renderMoviesList() {
    const cardsCount = Math.min(this._movies.length, this._renderedCardCount);

    render(this._contentComponent, this._moviesListComponent, RenderPosition.BEFOREEND);

    this._renderMovieCards(0, cardsCount);

    if (this._movies.length > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
  }

  _clearMovieList() {
    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this.moviePresenter.clear();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderMoviesBoard() {
    if (!this._movies.length) {
      this._renderNoMovies();
      return;
    }

    this._renderMoviesList();
  }

}
