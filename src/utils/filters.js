const moviesToFilterMap = [
  {
    name: 'all',
    count: (movies) => movies.length,
    title: 'All Movies',
  },
  {
    name: 'watchlist',
    count: (movies) => movies.filter((movie) => (movie.userDetails.watchlist === true)).length,
    title: 'Watchlist',
  },
  {
    name: 'history',
    count: (movies) => movies.filter((movie) => (movie.userDetails.alreadyWatched === true)).length,
    title: 'History',
  },
  {
    name: 'favorites',
    count: (movies) => movies.filter((movie) => (movie.userDetails.favorite === true)).length,
    title: 'Favorites',
  },
];

export const generateFilter = (movies) => moviesToFilterMap
  .map((it) => (Object.values(it)))
  .map(
    ([filterName, countMovies, filterTitle]) => ({
      name: filterName,
      count: countMovies(movies),
      title: filterTitle,
    }),
  );


