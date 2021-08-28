import Abstract from './abstract.js';
import { getFormattedDuration, getFormattedDescription } from '../utils/movies.js';
import { getFormattedReleaseYear } from '../utils/dates.js';

const createCardTemplate = (movie) => {
  const {filmInfo, comments} = movie;

  const {title, totalRating, runtime, genre, poster, description, release} = filmInfo;

  const releaseYear = getFormattedReleaseYear(release.date);
  const duration = getFormattedDuration(runtime);
  const formattedDescription = getFormattedDescription(description);
  const displayedGenre = genre[0];

  const commentsQuantity = comments ? comments.length : '0';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${displayedGenre}</span>
    </p>Ааа
    <img src=${poster} alt="${title}" class="film-card__poster">
    <p class="film-card__description">${formattedDescription}</p>
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
    // TODO: для чего это условие?
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

// TODO: Нужны сеттеры для клика для Add to watchlist, Mark as watched, Mark as favorite
// TODO: имя файла - card.js
