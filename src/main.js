import MoviesBoardPresenter from './presenter/movies-board.js';
import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import FooteStatisticsView from './view/footer-statistics.js';
import { generateFilter } from './utils/filters.js';
import { RenderPosition, render } from './utils/render.js';
import { generateMovies, generateCommentsForMovies } from './mock/movie.js';
import { getUserRank } from './utils/profile.js';
import { MOVIE_COUNT } from './const.js';


const generatedMovies = generateMovies(MOVIE_COUNT);
const comments = generateCommentsForMovies(generatedMovies);
const filters = generateFilter(generatedMovies);
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');

render(headerElement, new ProfileView(getUserRank(generatedMovies)), RenderPosition.BEFOREEND);
render(mainElement, new MainNavView(filters), RenderPosition.BEFOREEND);
render(footerElement, new FooteStatisticsView(generatedMovies.length), RenderPosition.BEFOREEND);

const moviesBoard = new MoviesBoardPresenter(mainElement);
moviesBoard.init(generatedMovies, comments);
