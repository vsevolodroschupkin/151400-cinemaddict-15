import dayjs from 'dayjs';
import { EMOTIONS } from '../const.js';
import { getFormattedDescription } from '../utils/movie/getFormattedDescription.js';
import { getFormattedDuration } from '../utils/movie/getFormattedDuration.js';
import Abstract from './abstract.js';

// TODO: commentsArray=>comments
// Б9. В названии переменных не используется тип данных.
const createPopupTemplate = (movie, commentsArray) => {
  const {filmInfo, comments} = movie;

  // TODO: деструктурировать filmInfo
  const title = filmInfo.title;
  const alternativeTitle = filmInfo.alternativeTitle;
  const rating = filmInfo.totalRating;
  const duration = getFormattedDuration(filmInfo.runtime);
  const genre = filmInfo.genre;
  const url = filmInfo.poster;
  const description = getFormattedDescription(filmInfo.description);
  const commentsQuantity = comments ? comments.length : '0';
  const director = filmInfo.director;
  const writers = filmInfo.writers.join(', ');
  const actors = filmInfo.actors.join(', ');
  // TODO: daysjs только в файле dates.js.
  // Получение форматированной даты в файле movies.js, getFormattedReleaseDate
  const releaseDate = dayjs(filmInfo.release.date).format('mm MMMM YYYY');
  const country = filmInfo.release.releaseCountry;
  const ageRating = filmInfo.ageRating;

  // TODO: ТЗ - Фильм может относиться к нескольким жанрам. Если фильм относится к нескольким жанрам, выводите «Genres», иначе «Genre».
  const genresTempalate = genre.map((element) => `<span class="film-details__genre">${element}</span>`).join(' ');

  // TODO: вынести на верхний уровень
  const createCommentItemTemplate = (comment) => {
    const {emotion, comment: text, author, date} = comment;
    // TODO: daysjs только в файле dates.js.
    const commentDate = dayjs(date).format('YYYY/MM/DD hh:mm');

    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  };

  // TODO: вынести на верхний уровень
  const createCommentsTemplate = (array) => {

    if(array.length === 0){
      return '';
    }

    const template = array
      .map((comment) => createCommentItemTemplate(comment))
      .join('');

    return `<ul class="film-details__comments-list">
      ${template}
      </ul>`;
  };

  // TODO: commentsArray=>comments
  // Б9. В названии переменных не используется тип данных.
  const commentsTemplate = createCommentsTemplate(commentsArray);

  // TODO: вынести на верхний уровень
  const createEmotionsTemplate = (emotions) => emotions
    .map((emotion) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
      <label class="film-details__emoji-label" for="emoji-${emotion}">
        <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
      </label>`)
    .join('');

  const emotionsTemplate = createEmotionsTemplate(EMOTIONS);

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
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
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
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${genresTempalate}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

          ${commentsTemplate}

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

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

export default class Popup extends Abstract {
  constructor(movie, comments) {
    super();
    this._movie = movie;
    this._comments = comments;
    this._popupCloseHandler = this._popupCloseHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._movie, this._comments);
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupClose();
  }

  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseHandler);
  }

}

// TODO: имя класса MovieDetails
// TODO: _popupCloseHandler=>_closeClickHandler
// TODO: setPopupCloseHandler=>setCloseClickHandler
