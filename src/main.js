import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import ContentView from './view/content.js';
import { createCardTemplate } from './view/card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics.js';
import { createPopupTemplate } from './view/popup.js';
import { generateMoviesArray, getMovieComments, generateCommentsForMovies } from './mock/movie-mock.js';
import { generateProfile } from './mock/profile-mock.js';
import { generateFilter } from './utils/filters.js';
import { renderTemplate } from './utils/renderTemplate.js';
import { RenderPosition } from './utils/renderPosition.js';
import { renderElement } from './utils/renderElement.js';

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
const showMorwButtonTemplate = createShowMoreButtonTemplate();
const footerStatisticsTemplate = createFooterStatisticsTemplate(movies.length);
const popupTemplate = createPopupTemplate(movies[0], getMovieComments(movies[12], comments));

renderElement(headerElement, new ProfileView(profile).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new MainNavView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new ContentView().getElement(), RenderPosition.BEFOREEND);

const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');
const topRatedFilmsContainer = mainElement.querySelector('.films-list:nth-child(2) .films-list__container');
const mostCommentedListContainer = mainElement.querySelector('.films-list:nth-child(3) .films-list__container');
const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');

if (movies.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCards = CARD_COUNT_PER_STEP;

  renderTemplate(filmsMainList, showMorwButtonTemplate, 'beforeend');

  const loadMoreButton = filmsMainList.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
      .forEach((card) => renderTemplate(filmsMainListContainer, createCardTemplate(card), 'beforeend'));

    renderedMovieCards += CARD_COUNT_PER_STEP;
    if ( renderedMovieCards >= movies.length) {
      loadMoreButton.remove();
    }

  });

}

for (let i = 0; i < cardsCount; i++) {
  const cardTemplate = createCardTemplate(movies[i]);
  renderTemplate(filmsMainListContainer, cardTemplate, 'beforeend');
}
for (let i = 0; i < CARD_COUNT_RATED_LIST; i++) {
  const cardTemplate = createCardTemplate(movies[i]);
  renderTemplate(topRatedFilmsContainer, cardTemplate, 'beforeend');
}
for (let i = 0; i < CARD_COUNT_COMMENTED_LIST; i++) {
  const cardTemplate = createCardTemplate(movies[i]);
  renderTemplate(mostCommentedListContainer, cardTemplate, 'beforeend');
}


renderTemplate(footerElement, footerStatisticsTemplate, 'beforeend');
// renderTemplate(footerElement, popupTemplate, 'afterend');
