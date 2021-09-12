import { EMOTIONS } from '../const.js';
import { getFormattedCommentDate, getFormattedReleaseDate } from '../utils/dates.js';
import { getFormattedDescription, getFormattedDuration } from '../utils/movies.js';
import SmartView from './smart.js';

const createCommentItemTemplate = (comment) => {
  const {emotion, comment: text, author, date} = comment;
  const formattedDate = getFormattedCommentDate(date);

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${formattedDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const createCommentsTemplate = (comments, isComments) => {
  if(!isComments){
    return '';
  }

  const template = comments
    .map((comment) => createCommentItemTemplate(comment))
    .join('');

  return `<ul class="film-details__comments-list">
    ${template}
    </ul>`;
};

const createEmotionsTemplate = (emotions) => emotions
  .map((emotion) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`)
  .join('');

const createDetailsTemplate = (data, movieComments) => {
  const {filmInfo, comments, userDetails, isSingleGenre, isComments, emoji } = data;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const {title, alternativeTitle, totalRating, runtime, genre, poster, description, director, writers, actors, release, ageRating} = filmInfo;

  const duration = getFormattedDuration(runtime);
  const url = poster;
  const formattedDescription = getFormattedDescription(description);
  const commentsQuantity = isComments ? comments.length : '0';
  const movieWriters = writers.join(', ');
  const movieActors = actors.join(', ');

  const releaseDate = getFormattedReleaseDate(release.date);
  const releaseCountry = release.releaseCountry;
  const genresTerm = isSingleGenre ? 'Genre' : 'Genres';

  const genresTemplate = genre.map((element) => `<span class="film-details__genre">${element}</span>`).join(' ');

  const commentsTemplate = createCommentsTemplate(movieComments, isComments);
  const emotionsTemplate = createEmotionsTemplate(EMOTIONS);

  const addToWatchlistActiveClass = watchlist ? 'film-details__control-button--active' : '';
  const favoriteActiveClass = favorite ? 'film-details__control-button--active' : '';
  const alreadyWatchedActiveClass = alreadyWatched ? 'film-details__control-button--active' : '';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${url} alt=${title}>

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${movieWriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${movieActors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genresTerm}</td>
                <td class="film-details__cell">
                  ${genresTemplate}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${formattedDescription}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${addToWatchlistActiveClass}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button  film-details__control-button--watched ${alreadyWatchedActiveClass}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteActiveClass}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

          ${commentsTemplate}

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${!emoji ? '' : `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
            ${emotionsTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class MovieDetails extends SmartView {
  constructor(movie, comments) {
    super();
    this._data = MovieDetails.parseMovieToData(movie);
    this._comments = comments;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._addToWatchlistHandler = this._addToWatchlistHandler.bind(this);
    this._addToFavoritesHandler = this._addToFavoritesHandler.bind(this);
    this._markAsWatchedHandler = this._markAsWatchedHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createDetailsTemplate(this._data, this._comments);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
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

  _emojiChangeHandler (evt) {
    evt.preventDefault();
    this.updateData(
      {
        emoji: evt.target.value,
      },
    );
  }

  _commentInputHandler (evt) {
    evt.preventDefault();
    this.updateData(
      {
        comment: evt.target.value,
      },
      true,
    );
  }

  _commentDeleteClickHandler (evt) {
    evt.preventDefault();
    this._callback.deleteComment(MovieDetails.parseDataToMovie(this._data));
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }

  setAddToWatchlistHandler (callback) {
    this._callback.addToWatchlist = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._addToWatchlistHandler);
  }

  setAddToFavoritesHandler (callback) {
    this._callback.addToFavorites = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._addToFavoritesHandler);
  }

  setMarkAsWatchedHandler (callback) {
    this._callback.markAsWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._markAsWatchedHandler);
  }

  setCommentDeleteClickHandler (callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete').forEach((it) => it.addEventListener('click', this._commentDeleteClickHandler));
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .querySelectorAll('.film-details__emoji-item')
      .forEach((it) => it.addEventListener('change', this._emojiChangeHandler));

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setAddToWatchlistHandler(this._callback.addToWatchlist);
    this.setMarkAsWatchedHandler(this._callback.markAsWatched);
    this.setAddToFavoritesHandler(this._callback.addToFavorites);
    this.setCommentDeleteClickHandler(this._callback.deleteComment);
  }

  reset(movie) {
    this.updateData(
      MovieDetails.parseMovieToData(movie),
    );
  }

  static parseMovieToData(movie) {
    return Object.assign(
      {},
      movie,
      {
        isSingleGenre: movie.filmInfo.genre.length === 1,
        isComments: movie.comments.length !== 0,
        comment: '',
        emoji: null,
      },
    );
  }

  static parseDataToMovie(data) {
    data = Object.assign({}, data);

    delete data.isMultipleGenre;
    delete data.isComments;
    delete data.comment;
    delete data.emoji;

    return data;
  }
}

