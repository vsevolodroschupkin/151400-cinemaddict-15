import Abstract from './abstract.js';

const createNoMovieTemplate = () => {

  const message = 'message about no movies';

  return `<section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section> `;
};

export default class NoMovie extends Abstract {
  getTemplate() {
    return createNoMovieTemplate();
  }
}

// TODO: имя класса NoMovie=>NoMovies
// TODO: имя файла no-movie=>no-movies
