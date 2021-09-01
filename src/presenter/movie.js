import { render, RenderPosition } from '../utils/render.js';
import CardView from '../view/card.js';
import MovieDetailsView from '../view/movie-details.js';
import { getMovieComments } from '../utils/movies.js';
import { isEscEvent } from '../utils/common.js';


export default class Movie {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this.cardComponent = null;

    this.handleOpenDatails = this._handleOpenDetails.bind(this);
    this._detailsCloseButtonClickHandler = this._detailsCloseButtonClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(movie, comments) {
    this._movie = movie;
    this._comments = getMovieComments(this._movie, comments);

    this._cardComponent = new CardView(this._movie);

    this._cardComponent.setOpenClickHandler(this._handleOpenDetails);

    render(this._movieListContainer, this._cardComponent, RenderPosition.BEFOREEND);

  }

  _escKeyDownHandler(evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      this._closeDetails(this._escKeyDownHandler);
    }
  }

  _closeDetails(cb) {
    this._detailsComponent.getElement().remove();
    document.body.removeEventListener('keydown', cb);
    document.body.classList.remove('hide-overflow');
  }

  _detailsCloseButtonClickHandler() {
    this._closeDetails(this._escKeyDownHandler);
  }

  _handleOpenDetails() {
    this._detailsComponent = new MovieDetailsView(this._movie, this._comments);

    this._detailsComponent.setCloseClickHandler(this._detailsCloseButtonClickHandler);
    document.body.appendChild(this._detailsComponent);
    document.body.classList.add('hide-overflow');
    document.body.addEventListener('keydown', this._escKeyDownHandler);

  }
}
