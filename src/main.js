import MoviesBoardPresenter from './presenter/movies-board.js';
import FilterPresenter from './presenter/filter.js';
import ProfileView from './view/profile.js';
import FilterModel from './model/filter.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import FooteStatisticsView from './view/footer-statistics.js';
import { RenderPosition, render } from './utils/render.js';
import { generateMovies, generateCommentsForMovies } from './mock/movie.js';
import { getUserRank } from './utils/profile.js';
import { MOVIE_COUNT } from './const.js';


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


render(headerElement, new ProfileView(getUserRank(generatedMovies)), RenderPosition.BEFOREEND);
render(footerElement, new FooteStatisticsView(generatedMovies.length), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
filterPresenter.init();

const moviesBoardPresenter = new MoviesBoardPresenter(mainElement, moviesModel, commentsModel, filterModel);
moviesBoardPresenter.init();

