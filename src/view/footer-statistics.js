import Abstract from './abstract.js';

const createFooterStatisticsTemplate = (number) => (
  `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`
);

export default class FooteStatistics extends Abstract {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._number);
  }

}
