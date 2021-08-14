import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import ContentView from './view/content.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooteStatisticsView from './view/footer-statistics.js';
import PopupView from './view/popup.js';
import { generateMoviesArray, getMovieComments, generateCommentsForMovies } from './mock/movie-mock.js';
import { generateProfile } from './mock/profile-mock.js';
import { generateFilter } from './utils/filters.js';
import { RenderPosition } from './utils/renderPosition.js';
import { render } from './utils/render.js';

const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_RATED_LIST = 2;
const CARD_COUNT_COMMENTED_LIST = 2;
const MOVIE_COUNT = 20;

const movies = generateMoviesArray(MOVIE_COUNT);
const comments = generateCommentsForMovies(movies);

const profile = generateProfile();
const filters = generateFilter(movies);

const cardsCount = Math.min(movies.length, CARD_COUNT_PER_STEP);

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');

render(headerElement, new ProfileView(profile).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNavView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new ContentView().getElement(), RenderPosition.BEFOREEND);

const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');
const topRatedFilmsContainer = mainElement.querySelector('.films-list:nth-child(2) .films-list__container');
const mostCommentedListContainer = mainElement.querySelector('.films-list:nth-child(3) .films-list__container');
const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');

if (movies.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCards = CARD_COUNT_PER_STEP;

  render(filmsMainList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsMainList.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsMainListContainer, new CardView(card).getElement(), RenderPosition.BEFOREEND));

    renderedMovieCards += CARD_COUNT_PER_STEP;

    if ( renderedMovieCards >= movies.length) {
      loadMoreButton.remove();
    }

  });

}

for (let i = 0; i < cardsCount; i++) {
  render(filmsMainListContainer, new CardView(movies[i]).getElement(), RenderPosition.BEFOREEND);
}
for (let i = 0; i < CARD_COUNT_RATED_LIST; i++) {
  render(topRatedFilmsContainer, new CardView(movies[i]).getElement(), RenderPosition.BEFOREEND);
}
for (let i = 0; i < CARD_COUNT_COMMENTED_LIST; i++) {
  render(mostCommentedListContainer, new CardView(movies[i]).getElement(), RenderPosition.BEFOREEND);
}

render(footerElement, new FooteStatisticsView(movies.length).getElement(), RenderPosition.BEFOREEND);
render(footerElement, new PopupView(movies[0], getMovieComments(movies[12], comments)).getElement(), RenderPosition.AFTEREND);
