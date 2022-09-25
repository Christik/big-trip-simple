import './point-view.css';

import View, {html} from './view.js';
import OfferView from './offer-view.js';

export default class PointView extends View {
  #id;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;
    this.id = `${this.constructor}-${state.id}`;

    this.classList.add('trip-events__item');

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   * @param {PointState} state
   */
  createTemplate(state) {
    return html`
      <div class="event">
        <time class="event__date" datetime="${state.startIsoDate}">
          ${state.startDate}
        </time>
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${state.type}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">${state.title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${state.startIsoDate}">
              ${state.startTime}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${state.endIsoDate}">
              ${state.endTime}
            </time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${state.price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <div class="event__selected-offers">
          ${state.offers.map(([title, price]) => html`
            <div class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </div>
          `)}
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  /**
   * @param {OfferState} state
   */
  createOfferTemplate(...state) {
    const [title, price] = state;

    return html`
      <div class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </div>
    `;
  }

  getId() {
    return this.#id;
  }

  /**
   * @param {OfferState[]} states
   */
  setOffers(states) {
    const views = states.map((state) => new OfferView(...state));

    this.querySelector('.event__selected-offers').replaceChildren(...views);

    return this;
  }

  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }

    event.preventDefault();

    this.dispatchEvent(new CustomEvent('edit', {bubbles: true}));
  }

  /**
   * @param {string} id
   * @param {Document | Element} rootView
   * @returns {PointView}
   */
  static findById(id, rootView = document) {
    return rootView.querySelector(`#${this}-${id}`);
  }
}

customElements.define(String(PointView), PointView);
