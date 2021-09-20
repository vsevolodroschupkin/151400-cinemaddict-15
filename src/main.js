import MoviesBoardPresenter from './presenter/movies-board.js';
import FilterPresenter from './presenter/filter.js';
import ProfileView from './view/profile.js';
import StatsView from './view/stats.js';
import FilterModel from './model/filter.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import FooteStatisticsView from './view/footer-statistics.js';
import { RenderPosition, render } from './utils/render.js';
import { generateMovies, generateCommentsForMovies } from './mock/movie.js';
import { getUserRank } from './utils/profile.js';
import { MOVIE_COUNT, MenuItem } from './const.js';
import { remove } from './utils/render.js';


const generatedMovies = generateMovies(MOVIE_COUNT);
const comments = generateCommentsForMovies(generatedMovies);

const moviesModel = new MoviesModel();
moviesModel.setMovies(generatedMovies);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const filterModel = new FilterModel();

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');

let statsComponent = null;
let currentMainMenuItem = MenuItem.MOVIES;
const moviesBoardPresenter = new MoviesBoardPresenter(mainElement, moviesModel, commentsModel, filterModel);

const handleMainMenuClick = (menuItem) => {

  if (currentMainMenuItem === menuItem) {
    return;
  }
  switch (menuItem) {
    case MenuItem.MOVIES:
      moviesBoardPresenter.init();
      remove(statsComponent);
      currentMainMenuItem = MenuItem.MOVIES;
      break;
    case MenuItem.STATISTICS:
      moviesBoardPresenter.destroy();
      statsComponent = new StatsView(moviesModel.getMovies());
      render(mainElement, statsComponent, RenderPosition.BEFOREEND);
      currentMainMenuItem = MenuItem.STATISTICS;
      break;
  }
};


render(headerElement, new ProfileView(getUserRank(moviesModel.getMovies())), RenderPosition.BEFOREEND);
render(footerElement, new FooteStatisticsView(moviesModel.getMovies().length), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel, handleMainMenuClick);


filterPresenter.init();
moviesBoardPresenter.init();


// moviesBoardPresenter.init();
// render(mainElement, new StatsView(), RenderPosition.BEFOREEND);

