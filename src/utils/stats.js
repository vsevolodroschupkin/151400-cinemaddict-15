import dayjs from "dayjs";

export const getWatchedMoviesCount = (movies) => {
  let watchedMoviesCount = 0;

  movies.forEach((movie) => {
    if (movie.userDatails.alreadyWatched) {
      watchedMoviesCount++;
    }
  });

  return watchedMoviesCount;
};

export const getTotalDuration = (movies) => {
  let totalDuration = 0;

  movies.forEach((movie) => {
    if(movie.userDetails.alreadyWatched) {
      totalDuration += movie.filmInfo.runtime;
    }
  });

  return totalDuration;
};

export const getGenresMap = (movies) => {
  const genresMap = new Map();

  movies.forEach((movie) => {
    movie.filmInfo.genre.forEach((genre) => {
      if (genresMap.get(genre) === undefined) {
        genresMap.set(genre, 1);
      } else {
        genresMap.set(genre, genresMap.get(genre) + 1);
      }
    });
  });

  return genresMap;
};

export const getSortedGenresMap = (genresMap) => new Map([...genresMap.entries()].sort((a, b) => b[1] - a[1]));

export const getTopGenre = (sortedGenresMap) => [...sortedGenresMap][0][0];

export const getDurationHours = (totalDuration) => Math.floor(totalDuration / 60);

export const getDurationMinutes = (totalDuration) => totalDuration % 60;

export const getMoviesOfPeriod = (movies, period) => {
  let periodStart = null;

  switch(period) {
    case 'all-time':
      periodStart = null;
      break;
    case 'today':
      periodStart = dayjs();
      break;
    case 'week':
      periodStart = dayjs().substract(7, 'days');
      break;
    case 'month':
      periodStart = dayjs().substract(1, 'month');
      break;
    case 'year':
      periodStart = dayjs().substract(1, 'year');
      break;
    default:
      periodStart = null;
  }

  if(!periodStart) {
    return movies;
  }

  // сформировать массив фильмов на основании даты
}

