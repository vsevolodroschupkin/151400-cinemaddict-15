import { render, RenderPosition, replace, remove } from '../utils/render.js';
import CardView from '../view/card.js';
import MovieDetailsView from '../view/movie-details.js';
import { getMovieComments } from '../utils/movies.js';
import { isEscEvent } from '../utils/common.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

const START_SCROLL_POSITION = 0;

export default class Movie {
  constructor(movieListContainer, changeData, changeMode, setOpenedMovie, setPopupScrollPosition) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._setOpenedMovie = setOpenedMovie;
    this._setPopupScrollPosition = setPopupScrollPosition;

    this._cardComponent = null;
    this._movieDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenDetails = this._handleOpenDetails.bind(this);
    this._handleAdToWatchlistClick = this._handleAdToWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleDetailsCloseButtonClick = this._handleDetailsCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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
    this._movieDetailsComponent.setCommentDeleteClickHandler(this._handleDeleteClick);


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

  restoreOpenedPopup(scrollTop = START_SCROLL_POSITION) {
    this._handleOpenDetails();
    this._movieDetailsComponent.setScrollTop(scrollTop);
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }

  destroy() {
    if (this._mode === Mode.DETAILS) {
      this._setPopupScrollPosition(this._movieDetailsComponent.getScrollTop());
    }
    remove(this._cardComponent);
    remove(this._movieDetailsComponent);
  }

  openDetails() {
    this._handleOpenDetails();
  }

  _escKeyDownHandler(evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      this._closeDetails();
    }

  }

  _closeDetails() {
    this._movieDetailsComponent.reset(this._movie);
    this._movieDetailsComponent.getElement().remove();
    document.body.removeEventListener('keydown', this._escKeyDownHandler);
    document.body.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
    this._setOpenedMovie(null);
    this._setPopupScrollPosition(START_SCROLL_POSITION);
  }

  _handleDetailsCloseButtonClick() {
    this._closeDetails();
  }

  _renderMovieDetails() {
    document.body.appendChild(this._movieDetailsComponent.getElement());
    document.body.classList.add('hide-overflow');
    document.body.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleOpenDetails () {
    this._changeMode();
    this._renderMovieDetails();
    this._mode = Mode.DETAILS;
    this._setOpenedMovie(this._movie);
    this._setPopupScrollPosition(START_SCROLL_POSITION);
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

    this._changeData(
      USER_ACTION.UPDATE_MOVIE,
      UPDATE_TYPE.MINOR,
      updatedMovie);
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

    this._changeData(
      USER_ACTION.UPDATE_MOVIE,
      UPDATE_TYPE.MINOR,
      updatedMovie);
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

    this._changeData(
      USER_ACTION.UPDATE_MOVIE,
      UPDATE_TYPE.MINOR,
      updatedMovie);
  }

  _handleDeleteClick(id) {
    const data = {
      commentId: Number(id),
      movie: this._movie,
    };
    this._changeData(
      USER_ACTION.DELETE_COMMENT,
      UPDATE_TYPE.MINOR,
      data,
    );
  }

}
