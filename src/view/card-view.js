export const createCardTemplate = (movie) => {
  const {film_info: filmInfo, comments} = movie;

  const title = filmInfo.title;
  const rating = filmInfo.total_rating;
  const year = filmInfo.release.date;
  const durationHours = Math.floor(filmInfo.runtime / 60) !== 0 ? `${Math.floor(filmInfo.runtime / 60)}h` : '';
  const durationMinutes = `${filmInfo.runtime % 60}m`;
  const duration = `${durationHours} ${durationMinutes}`;
  const genre = filmInfo.genre[0];
  const url = filmInfo.poster;
  const description = filmInfo.description;
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
