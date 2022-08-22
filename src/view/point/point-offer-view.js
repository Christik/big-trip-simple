import ComponentView, { html } from '../component-view.js';

export default class PointOfferView extends ComponentView {
  constructor() {
    super();
    this.classList.add('event__offer');
  }

  /** @override */
  createTemplate() {
    return html`
      <span class="event__offer-title">Title</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">0</span>
    `;
  }

  /** @param {string} title */
  setTitle(title) {
    const view = this.querySelector('.event__offer-title');

    view.textContent = title;

    return this;
  }

  /** @param {number} price */
  setPrice(price) {
    const view = this.querySelector('.event__offer-price');

    view.textContent = String(price);

    return this;
  }
}

customElements.define(String(PointOfferView), PointOfferView);
