import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import ContentView from './view/content.js';
import FilmslistView from './view/filmslist.js';
import CardView from './view/card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooteStatisticsView from './view/footer-statistics.js';
import PopupView from './view/popup.js';
import NoMoviesView from './view/no-movies.js';
import { generateFilter } from './utils/filters.js';
import { RenderPosition, render } from './utils/render.js';
import { isEscEvent } from './utils/common.js';
import { getMovieComments } from './utils/movies.js';
import { generateMovies, generateCommentsForMovies } from './mock/movie.js';

const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_RATED_LIST = 2;
const CARD_COUNT_COMMENTED_LIST = 2;
const MOVIE_COUNT = 20;


const movies = generateMovies(MOVIE_COUNT);
const watchedMoviesCount = movies.filter((it) => it.userDetails.alreadyWatched).length;
const comments = generateCommentsForMovies(movies);

const filters = generateFilter(movies);

const cardsCount = Math.min(movies.length, CARD_COUNT_PER_STEP);

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');

const openPopup = (card, movieComments) => () => {
  const popupComponent = new PopupView(card, getMovieComments(card, movieComments));

  const closePopup = (cb) => {
    popupComponent.getElement().remove();
    document.body.removeEventListener('keydown', cb);
    document.body.classList.remove('hide-overflow');
  };
  const onPopupEscKeydown = (evt) => {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(onPopupEscKeydown);
    }
  };
  const onPopupCloseButtonClick = () => {
    closePopup(onPopupEscKeydown);
  };

  popupComponent.setPopupCloseHandler(onPopupCloseButtonClick);

  document.body.appendChild(popupComponent.getElement());
  document.body.classList.add('hide-overflow');
  document.body.addEventListener('keydown', onPopupEscKeydown);
};

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);

  cardComponent.setPopupOpenHandler(openPopup(card, comments));
  render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
};

render(headerElement, new ProfileView(watchedMoviesCount), RenderPosition.BEFOREEND);
render(mainElement, new MainNavView(filters), RenderPosition.BEFOREEND);
// TODO: скобки при создании объекта
render(mainElement, new SortingView(), RenderPosition.BEFOREEND);
render(mainElement, new ContentView(), RenderPosition.BEFOREEND);

const contentContainer = mainElement.querySelector('.films');

// TODO: сразу return, без else
if (!movies.length) {
  render(contentContainer, new NoMoviesView(), RenderPosition.AFTERBEGIN);
} else {
  // TODO: достаточно перечисления FilmTitles
  // TODO: не рендерить в цикле, лучше по отдельности
  const FILM_CONTAINERS_META = [
    {
      title: 'All movies. Upcoming',
      isExtra: false,
      cardsNumber: cardsCount,
    },
    {
      title: 'Top rated',
      isExtra: true,
      cardsNumber: CARD_COUNT_RATED_LIST,
    },
    {
      title: 'Most Commented',
      isExtra: true,
      cardsNumber: CARD_COUNT_COMMENTED_LIST,
    },
  ];

  FILM_CONTAINERS_META.forEach((element) => {
    const filmlistTemplate = new FilmslistView(element.title, element.isExtra);
    render(contentContainer, filmlistTemplate, RenderPosition.BEFOREEND);

    const filmsListContainer = filmlistTemplate.getContainer();

    for (let i = 0; i < element.cardsNumber; i++) {
      renderCard(filmsListContainer, movies[i]);
    }
  });
}

if (movies.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCards = CARD_COUNT_PER_STEP;
  // TODO: получать лист через getContainer
  // const moviesListView = new MovieslistView(ListTitle.ALL, false)
  // const container = moviesListView.getContainer()
  const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');
  const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsMainList, showMoreButtonComponent, RenderPosition.BEFOREEND);

  // TODO: использовать функцию renderCard, иначе попап не открывается
  showMoreButtonComponent.setClickHandler(() => {
    movies
      .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsMainListContainer, new CardView(card), RenderPosition.BEFOREEND));

    renderedMovieCards += CARD_COUNT_PER_STEP;

    if ( renderedMovieCards >= movies.length) {
      showMoreButtonComponent.remove();
    }

  });
}

render(footerElement, new FooteStatisticsView(movies.length), RenderPosition.BEFOREEND);

// TODO: структура файла

// renderHeader()
// renderMoviesBoard()
// renderFooter()

// вспомогательные функции:
// renderNoMovies
// renderMainMoviesList
// renderTopRatedMoviesList
// rendetMostCommentedMoviesList
// renderMovieCard


// TODO: баги
// - не открывается попап на фильмы, которые отрисовываются по load more
// - не выводится ранг пользователя в зависимости от количества фильмов

// TODO: использовать в наименованиях или film или movie, чтобы было единообразно

// Рекомендации:
// - делать пока без доп. списков фильмов
