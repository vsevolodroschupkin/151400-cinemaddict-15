import Abstract from './abstract.js';


const createContentTemplate = () => (
  `<section class="films">
  </section>`
);

export default class Content extends Abstract {

  getTemplate() {
    return createContentTemplate();
  }

}
