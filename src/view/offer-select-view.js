import './offer-select-view.css';

import ComponentView, {html} from './component-view.js';

export default class OfferSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__section', 'event__section--offers');

    this.offersView = this.querySelector('.event__available-offers');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers"></div>
  `;
  }

  createOptionTemplate(id, title, price) {
    return html`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          type="checkbox"
          name="event-offer-${id}"
        >
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `;
  }

  /**
   * @param {[number, string, number][]} states
   */
  setOptions(states) {
    const areOffersEmpty = (states.length === 0);
    const templates = states.map((state) => this.createOptionTemplate(...state));

    if (areOffersEmpty) {
      this.hidden = true;

      return this;
    }

    this.hidden = false;
    this.offersView.innerHTML = templates.join('');

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsChecked(flags) {
    const inputViews = this.querySelectorAll('input');

    flags.forEach((flag, index) => (inputViews[index].checked = flag));

    return this;
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);
