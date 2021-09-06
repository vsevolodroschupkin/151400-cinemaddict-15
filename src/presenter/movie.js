import { render, RenderPosition, replace, remove } from '../utils/render.js';
import CardView from '../view/card.js';
import MovieDetailsView from '../view/movie-details.js';
import { getMovieComments } from '../utils/movies.js';
import { isEscEvent } from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

export default class Movie {
  constructor(movieListContainer, changeData, changeMode) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._movieDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenDetails = this._handleOpenDetails.bind(this);
    this._handleAdToWatchlistClick = this._handleAdToWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleDetailsCloseButtonClick = this._handleDetailsCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(movie, comments) {
    this._movie = movie;
    this._comments = getMovieComments(this._movie, comments);

    const prevCardComponent = this._cardComponent;
    const prevMovieDetailsComponent = this._movieDetailsComponent;

    this._cardComponent = new CardView(this._movie);

    this._cardComponent.setOpenClickHandler(this._handleOpenDetails);
    this._cardComponent.setAddToWatchlistHandler(this._handleAdToWatchlistClick);
    this._cardComponent.setAddToFavoritesHandler(this._handleFavoriteClick);
    this._cardComponent.setMarkAsWatchedHandler(this._handleMarkAsWatchedClick);

    this._movieDetailsComponent = new MovieDetailsView(this._movie, this._comments);


    this._movieDetailsComponent.setCloseClickHandler(this._handleDetailsCloseButtonClick);
    this._movieDetailsComponent.setAddToFavoritesHandler(this._handleFavoriteClick);
    this._movieDetailsComponent.setMarkAsWatchedHandler(this._handleMarkAsWatchedClick);
    this._movieDetailsComponent.setAddToWatchlistHandler(this._handleAdToWatchlistClick);


    if (prevCardComponent === null) {
      return render(this._movieListContainer, this._cardComponent, RenderPosition.BEFOREEND);
    }

    if (this._movieListContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._mode === Mode.DETAILS) {
      replace(this._movieDetailsComponent, prevMovieDetailsComponent);
    }

    remove(prevCardComponent);
    remove(prevMovieDetailsComponent);

  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._movieDetailsComponent);
  }

  _escKeyDownHandler(evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      this._closeDetails();
    }
  }

  _closeDetails() {
    this._movieDetailsComponent.getElement().remove();
    document.body.removeEventListener('keydown', this._escKeyDownHandler);
    document.body.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
  }

  _handleDetailsCloseButtonClick() {
    this._closeDetails();
  }

  _handleOpenDetails() {
    this._changeMode();
    document.body.appendChild(this._movieDetailsComponent.getElement());
    document.body.classList.add('hide-overflow');
    document.body.addEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DETAILS;
  }

  _handleAdToWatchlistClick() {
    const updatedUserDetails = {};
    const updatedMovie = {};

    Object.assign(
      updatedUserDetails,
      this._movie.userDetails,
      {
        watchlist: !this._movie.userDetails.watchlist,
      },
    );

    Object.assign(
      updatedMovie,
      this._movie,
      {
        userDetails: updatedUserDetails,
      },
    );

    this._changeData(updatedMovie);
  }

  _handleFavoriteClick() {
    const updatedUserDetails = {};
    const updatedMovie = {};

    Object.assign(
      updatedUserDetails,
      this._movie.userDetails,
      {
        favorite: !this._movie.userDetails.favorite,
      },
    );

    Object.assign(
      updatedMovie,
      this._movie,
      {
        userDetails: updatedUserDetails,
      },
    );

    this._changeData(updatedMovie);
  }

  _handleMarkAsWatchedClick() {
    const updatedUserDetails = {};
    const updatedMovie = {};

    Object.assign(
      updatedUserDetails,
      this._movie.userDetails,
      {
        alreadyWatched: !this._movie.userDetails.alreadyWatched,
      },
    );

    Object.assign(
      updatedMovie,
      this._movie,
      {
        userDetails: updatedUserDetails,
      },
    );

    this._changeData(updatedMovie);
  }
}
