import SortingView from '../view/sorting.js';
import ContentView from '../view/content.js';
import MovieslistView from '../view/movies-list.js';
import CardView from '../view/card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import MovieDetailsView from '../view/movie-details.js';
import NoMoviesView from '../view/no-movies.js';
import { RenderPosition, render, remove } from '../utils/render.js';
import { CARD_COUNT_PER_STEP, CONTAINER_TITLES } from '../const.js';
import { isEscEvent } from '../utils/common.js';
import { getMovieComments } from '../utils/movies.js';


export default class MoviesBoard {
  constructor (moviesBoardContainer){
    this._moviesBoardContainer = moviesBoardContainer;

    this._sortingComponent = new SortingView();
    this._contentComponent = new ContentView().getContainer();
    this._moviesListComponent = new MovieslistView();
    this._cardComponent = new CardView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noMoviesComponent = new NoMoviesView();
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

  _renderShowMoreButton() {
    const moviesListContainer = this._moviesListComponent.getContainer();
    let renderedMovieCards = CARD_COUNT_PER_STEP;

    const showMoreButtonComponent = this._showMoreButtonComponent;

    render(moviesListContainer, showMoreButtonComponent, RenderPosition.AFTEREND);

    showMoreButtonComponent.setClickHandler(() => {
      this._movies
        .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
        .forEach((card) => this._renderMovieCard(moviesListContainer, card));

      renderedMovieCards += CARD_COUNT_PER_STEP;

      if ( renderedMovieCards >= this._movies.length) {
        remove(showMoreButtonComponent);
      }

    });
  }

  _renderNoMovies() {
    render(this._contentComponent, this._noMoviesComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovieCard(movie) {
    const cardComponent = new CardView(movie);

    const openPopup = () => {
      const popupComponent = new MovieDetailsView(movie, getMovieComments(movie, this._comments));

      const closePopup = (cb) => {
        popupComponent.getElement().remove();
        document.body.removeEventListener('keydown', cb);
        document.body.classList.remove('hide-overflow');
      };
      const onPopupEscKeydown = (evt) => {
        if(isEscEvent(evt)) {
          evt.preventDefault();
          closePopup(onPopupEscKeydown);
        }
      };
      const onPopupCloseButtonClick = () => {
        closePopup(onPopupEscKeydown);
      };

      popupComponent.setCloseClickHandler(onPopupCloseButtonClick);
      document.body.appendChild(popupComponent.getElement());
      document.body.classList.add('hide-overflow');
      document.body.addEventListener('keydown', onPopupEscKeydown);
    };

    cardComponent.setOpenClickHandler(openPopup);
    render(this._moviesListComponent, cardComponent, RenderPosition.BEFOREEND);
  }

  _renderMoviesList() {
    const cardsCount = Math.min(this._movies.length, CARD_COUNT_PER_STEP);
    const movieslistTemplate = this._moviesListComponent(CONTAINER_TITLES.all);

    render(this._contentComponent, movieslistTemplate, RenderPosition.BEFOREEND);

    for (let i = 0; i < cardsCount; i++) {
      this._renderMovieCard(this._movies[i]);
    }

    if (this._movies.length > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMoviesBoard() {

    const contentContainer = this._contentTemplate;

    if (!this._movies.length) {
      this._renderNoMovies();
      return;
    }

    this._renderMovieslist(contentContainer, this._movies);
  }

}
