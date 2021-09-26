import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getDurationMinutes, getDurationHours, getGenresMap, getSortedGenresMap, getTopGenre, getTotalDuration } from '../utils/stats.js';

const StatFilterTypes = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

const ChartOptions = {
  CANVAS_WIDTH: 1000,
};

const BAR_HEIGHT = 50;

const createChart = (ctx, data) => {
  const {movies} = data;
  const genresMap = getGenresMap(movies);
  const sortedGenresMap = getSortedGenresMap(genresMap);

  const chartLabels = [...sortedGenresMap.keys()];
  const chartData = [...sortedGenresMap.values()];

  const myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  return myChart;
};


const createStatsTemplate = (data) => {
  const {movies, rank} = data;

  const genresMap = getGenresMap(movies);
  const canvasWidth = ChartOptions.CANVAS_WIDTH;
  const canvasHeight = genresMap.size * BAR_HEIGHT;
  const moviesCount = movies.slice().filter((movie) => movie.userDetails.alreadyWatched).length;
  const topGenre = getTopGenre(getSortedGenresMap(genresMap));
  const totalDuration = getTotalDuration(movies);
  const durationHours = getDurationHours(totalDuration);
  const durationMiutes = getDurationMinutes(totalDuration);

  console.log(totalDuration);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>

    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${moviesCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span> ${durationMiutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="${canvasWidth}" height=${canvasHeight}>

      </canvas>
    </div>

  </section>`;
};


export default class Stats extends SmartView {
  constructor(movies, rank = null) {
    super();
    this._movies = movies;

    this._data = {
      movies: getMoviesOfPeriod(this._movies, 'all-time'),
      rank,
      period: 'all-time',
    };

    this._periodChangeHandler = this._periodChangeHandler.bind(this);
    this._setInnerHandlers();

    this._setChart();
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setChart();
  }

  _periodChangeHandler(evt) {
    evt.preventDefault();

    const periodValue = evt.target.value;

    this.updateData({
      movies: getMoviesOfPeriod(this._movies, periodValue),
      period: periodValue,
    });

    this.getElement().querySelector(`#statistic-${periodValue}`).setAttribute('checked', 'true');

  }

  _setChart() {
    const statsCtx = this.getElement().querySelector('.statistic__chart');

    createChart(statsCtx, this._data);
  }

}
