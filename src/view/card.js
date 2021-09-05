import Abstract from './abstract.js';
import { getFormattedDuration, getFormattedDescription } from '../utils/movies.js';
import { getFormattedReleaseYear } from '../utils/dates.js';

const createCardTemplate = (movie) => {
  const {filmInfo, comments, userDetails} = movie;

  const {title, totalRating, runtime, genre, poster, description, release} = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;

  const releaseYear = getFormattedReleaseYear(release.date);
  const duration = getFormattedDuration(runtime);
  const formattedDescription = getFormattedDescription(description);
  const displayedGenre = genre[0];

  const commentsQuantity = comments ? comments.length : '0';
  const addToWatchlistActiveClass = watchlist ? 'film-card__controls-item--active' : '';
  const favoriteActiveClass = favorite ? 'film-card__controls-item--active' : '';
  const alreadyWatchedActiveClass = alreadyWatched ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${displayedGenre}</span>
    </p>
    <img src=${poster} alt="${title}" class="film-card__poster">
    <p class="film-card__description">${formattedDescription}</p>
    <a class="film-card__comments">${commentsQuantity} ${commentsQuantity === 1 ? 'comment' : 'comments'}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addToWatchlistActiveClass}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedActiveClass}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteActiveClass}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends Abstract {
  constructor(movie) {
    super();
    this._movie = movie;
    this._openClickHandler = this._openClickHandler.bind(this);
    this._addToWatchlistHandler = this._addToWatchlistHandler.bind(this);
    this._addToFavoritesHandler = this._addToFavoritesHandler.bind(this);
    this._markAsWatchedHandler = this._markAsWatchedHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._movie);
  }

  _openClickHandler (evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  _addToWatchlistHandler (evt) {
    evt.preventDefault();
    this._callback.addToWatchlist();
  }

  _addToFavoritesHandler (evt) {
    evt.preventDefault();
    this._callback.addToFavorites();
  }

  _markAsWatchedHandler (evt) {
    evt.preventDefault();
    this._callback.markAsWatched();
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;

    const cardCover = this.getElement().querySelector('.film-card__poster');
    const cardTitle = this.getElement().querySelector('.film-card__title');
    const cardComments = this.getElement().querySelector('.film-card__comments');

    const cardElements = [cardCover, cardTitle, cardComments];

    cardElements.forEach((element) => element.addEventListener('click', this._openClickHandler));
  }

  setAddToWatchlistHandler (callback) {
    this._callback.addToWatchlist = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addToWatchlistHandler);
  }

  setAddToFavoritesHandler (callback) {
    this._callback.addToFavorites = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._addToFavoritesHandler);
  }

  setMarkAsWatchedHandler (callback) {
    this._callback.markAsWatched = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._markAsWatchedHandler);
  }

}

