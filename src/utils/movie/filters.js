const moviesToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies.filter((movie) => (movie.userDetails.watchlist === true)).length,
  history: (movies) => movies.filter((movie) => (movie.userDetails.alreadyWatched === true)).length,
  favorites: (movies) => movies.filter((movie) => (movie.userDetails.favorite === true)).length ,
};

export const generateFilter = (movies) => Object.entries(moviesToFilterMap).map(
  ([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  }),
);
