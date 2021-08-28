import Abstract from './abstract.js';

const createNoMoviesTemplate = () => {

  const message = 'message about no movies';

  return `<section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section> `;
};

export default class NoMovies extends Abstract {
  getTemplate() {
    return createNoMoviesTemplate();
  }
}
