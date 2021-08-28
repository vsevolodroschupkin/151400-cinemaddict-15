import { USER_RANKS } from '../const.js';

export const getUserRank = (movies) => {
  const watchedMoviesCount = movies.filter((it) => it.userDetails.alreadyWatched).length;

  if(watchedMoviesCount >= USER_RANKS.MOVIE_BUFF.min){
    return USER_RANKS.MOVIE_BUFF.title;
  }
  if(watchedMoviesCount >= USER_RANKS.FUN.min){
    return USER_RANKS.FUN.title;
  }
  if(watchedMoviesCount >= USER_RANKS.NOVICE.min){
    return USER_RANKS.NOVICE.title;
  }

  return '';

};
