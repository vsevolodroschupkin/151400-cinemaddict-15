import { createProfileTemplate } from './view/profile.js';
import { createMainNavTemplate } from './view/main-navigation.js';
import { createSortingTemplate } from './view/sort.js';
import { createContentTemplate } from './view/content.js';
import { createCardTemplate } from './view/card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics.js';
import { createPopupTemplate } from './view/popup.js';
import { generateMovie } from './mock/movie-mock.js';

const CARD_COUNT_MAIN_LIST = 5;
const CARD_COUNT_RATED_LIST = 2;
const CARD_COUNT_COMMENTED_LIST = 2;
const MOVIE_COUNT = 20;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const render = (container, template, place ) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');
const profileTemplate = createProfileTemplate();
const mainNavigationTemplate = createMainNavTemplate();
const sortingTemplate = createSortingTemplate();
const contentTemplate = createContentTemplate();
const showMorwButtonTemplate = createShowMoreButtonTemplate();
const footerStatisticsTemplate = createFooterStatisticsTemplate();
const popupTemplate = createPopupTemplate(movies[0]);

render(headerElement, profileTemplate, 'beforeend');
render(mainElement, mainNavigationTemplate, 'beforeend');
render(mainElement, sortingTemplate, 'beforeend');
render(mainElement, contentTemplate, 'beforeend');

const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');
const topRatedFilmsContainer = mainElement.querySelector('.films-list:nth-child(2) .films-list__container');
const mostCommentedListContainer = mainElement.querySelector('.films-list:nth-child(3) .films-list__container');
const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');

render(filmsMainList, showMorwButtonTemplate, 'beforeend');

for (let i = 0; i < CARD_COUNT_MAIN_LIST; i++) {
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
// render(footerElement, popupTemplate, 'afterend');
