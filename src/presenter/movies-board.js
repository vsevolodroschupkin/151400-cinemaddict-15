import MoviePresenter from './movie.js';
import SortingView from '../view/sorting.js';
import ContentView from '../view/content.js';
import MovieslistView from '../view/movies-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoMoviesView from '../view/no-movies.js';
import { RenderPosition, render, remove } from '../utils/render.js';
import { CARD_COUNT_PER_STEP, CONTAINER_TITLES } from '../const.js';
export default class MoviesBoard {
  constructor (moviesBoardContainer){
    this._moviesBoardContainer = moviesBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;

    this._sortingComponent = new SortingView();
    this._contentComponent = new ContentView();
    this._moviesListComponent = new MovieslistView(CONTAINER_TITLES.all);
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noMoviesComponent = new NoMoviesView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(movies, comments) {
    this._movies = movies.slice();
    this._comments = comments.slice();

    this._renderSort();
    this._renderContent();
    this._renderMoviesBoard();
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
    // const cardComponent = new CardView(movie);

    // const openPopup = () => {
    //   const popupComponent = new MovieDetailsView(movie, getMovieComments(movie, this._comments));

    //   const closePopup = (cb) => {
    //     popupComponent.getElement().remove();
    //     document.body.removeEventListener('keydown', cb);
    //     document.body.classList.remove('hide-overflow');
    //   };
    //   const onPopupEscKeydown = (evt) => {
    //     if(isEscEvent(evt)) {
    //       evt.preventDefault();
    //       closePopup(onPopupEscKeydown);
    //     }
    //   };
    //   const onPopupCloseButtonClick = () => {
    //     closePopup(onPopupEscKeydown);
    //   };

    //   popupComponent.setCloseClickHandler(onPopupCloseButtonClick);
    //   document.body.appendChild(popupComponent.getElement());
    //   document.body.classList.add('hide-overflow');
    //   document.body.addEventListener('keydown', onPopupEscKeydown);
    // };

    // cardComponent.setOpenClickHandler(openPopup);
    // render(this._moviesListComponent.getContainer(), cardComponent, RenderPosition.BEFOREEND);

    const moviePresenter = new MoviePresenter(this._moviesListComponent.getContainer());

    moviePresenter.init(movie, this._comments);
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

  _renderMoviesBoard() {
    if (!this._movies.length) {
      this._renderNoMovies();
      return;
    }

    this._renderMoviesList();
  }

}
