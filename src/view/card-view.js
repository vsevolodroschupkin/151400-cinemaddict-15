import Abstract from './abstract.js';
import dayjs from 'dayjs';
import { getFormattedDuration } from '../utils/movie/getFormattedDuration.js';
import { getFormattedDescription } from '../utils/getFormattedDescription.js';

const createCardTemplate = (movie) => {
  const {filmInfo, comments} = movie;

  const title = filmInfo.title;
  const rating = filmInfo.totalRating;
  const year = dayjs(filmInfo.release.date).format('YYYY');
  const duration = getFormattedDuration(filmInfo.runtime);
  const genre = filmInfo.genre[0];
  const url = filmInfo.poster;
  const description = getFormattedDescription(filmInfo.description);
  const commentsQuantity = comments ? comments.length : '0';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${url} alt="${title}" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentsQuantity} ${commentsQuantity === 1 ? 'comment' : 'comments'}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends Abstract {
  constructor(movie) {
    super();
    this._movie = movie;
    this._popupOpenHandler = this._popupOpenHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._movie);
  }

  _popupOpenHandler (evt) {
    evt.preventDefault();
    if(!document.querySelector('.film-details')){
      this._callback.popupOpen();
    }
  }

  setPopupOpenHandler(callback) {
    this._callback.popupOpen = callback;

    const cardCover = this.getElement().querySelector('.film-card__poster');
    const cardTitle = this.getElement().querySelector('.film-card__title');
    const cardComments = this.getElement().querySelector('.film-card__comments');

    const cardElements = [cardCover, cardTitle, cardComments];

    cardElements.forEach((element) => element.addEventListener('click', this._popupOpenHandler));
  }

}
