import { createProfileTemplate } from './view/profile.js';
import { createMainNavTemplate } from './view/main-navigation.js';
import { createSortingTemplate } from './view/sort.js';
import { createContentTemplate } from './view/content.js';
import { createCardTemplate } from './view/card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics.js';
import { createPopupTemplate } from './view/popup.js';
import { generateMoviesArray, getMovieComments, generateCommentsForMovies } from './mock/movie-mock.js';
import { generateProfile } from './mock/profile-mock.js';
import { generateFilter } from './mock/filters-mock.js';

const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_RATED_LIST = 2;
const CARD_COUNT_COMMENTED_LIST = 2;
const MOVIE_COUNT = 20;
const TOTAL_MOVIE_NUMBER = 13029;

const movies = generateMoviesArray(MOVIE_COUNT);
const comments = generateCommentsForMovies(movies);

const profile = generateProfile();
const filters = generateFilter(movies);

const cardsCount = Math.min(movies.length, CARD_COUNT_PER_STEP);

const render = (container, template, place ) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');
const profileTemplate = createProfileTemplate(profile);
const mainNavigationTemplate = createMainNavTemplate(filters);
const sortingTemplate = createSortingTemplate();
const contentTemplate = createContentTemplate();
const showMorwButtonTemplate = createShowMoreButtonTemplate();
const footerStatisticsTemplate = createFooterStatisticsTemplate(TOTAL_MOVIE_NUMBER);
const popupTemplate = createPopupTemplate(movies[0], getMovieComments(movies[12], comments));

render(headerElement, profileTemplate, 'beforeend');
render(mainElement, mainNavigationTemplate, 'beforeend');
render(mainElement, sortingTemplate, 'beforeend');
render(mainElement, contentTemplate, 'beforeend');

const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');
const topRatedFilmsContainer = mainElement.querySelector('.films-list:nth-child(2) .films-list__container');
const mostCommentedListContainer = mainElement.querySelector('.films-list:nth-child(3) .films-list__container');
const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');

if (movies.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCards = CARD_COUNT_PER_STEP;

  render(filmsMainList, showMorwButtonTemplate, 'beforeend');

  const loadMoreButton = filmsMainList.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsMainListContainer, createCardTemplate(card), 'beforeend'));

    renderedMovieCards += CARD_COUNT_PER_STEP;
    if ( renderedMovieCards >= movies.length) {
      loadMoreButton.remove();
    }

  });

}

for (let i = 0; i < cardsCount; i++) {
  const cardTemplate = createCardTemplate(movies[i]);
  render(filmsMainListContainer, cardTemplate, 'beforeend');
}
for (let i = 0; i < CARD_COUNT_RATED_LIST; i++) {
  const cardTemplate = createCardTemplate(movies[i]);
  render(topRatedFilmsContainer, cardTemplate, 'beforeend');
}
for (let i = 0; i < CARD_COUNT_COMMENTED_LIST; i++) {
  const cardTemplate = createCardTemplate(movies[i]);
  render(mostCommentedListContainer, cardTemplate, 'beforeend');
}


render(footerElement, footerStatisticsTemplate, 'beforeend');
render(footerElement, popupTemplate, 'afterend');
