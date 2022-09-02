import ComponentView from './component-view.js';
import { html } from '../utils.js';

export default class PointOfferView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createTemplate(title, price) {
    return html`
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    `;
  }
}

customElements.define(String(PointOfferView), PointOfferView);
