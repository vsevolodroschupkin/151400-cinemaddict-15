import dayjs from 'dayjs';
import { getRandomInteger } from './random.js';

export const addDaysToDate = (date, daysCount) => dayjs().add(getRandomInteger(date.getDay(), daysCount), 'days').toDate();

export const getFormattedReleaseYear = (date) => dayjs(date).format('YYYY');

export const getFormattedReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const getFormattedCommentDate = (date) => dayjs(date).format('YY/MM/DD hh:mm');

export const sortMoviesByDateDesc = (movieA, movieB) => dayjs(movieB.filmInfo.release.date).diff(dayjs(movieA.filmInfo.release.date));
