import BaseView from './base-view.js';
import { createOfferSelectorTemplate } from './offer-selection-template.js';

export default class OfferSelectorView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__offer-selector');
  }

  /**
   * @override
   */
  createTemplate() {
    return createOfferSelectorTemplate();
  }

  setInput(id, type, isChecked) {
    const uniqueName = `event-offer-${type}-${id}`;
    const inputProperties = {
      id: uniqueName,
      name: uniqueName,
      checked: isChecked,
    };
    const labelProperties = {
      htmlFor: uniqueName,
    };

    this.set('.event__offer-checkbox', inputProperties);
    this.set('.event__offer-label', labelProperties);

    return this;
  }

  setTitle(title) {
    return this.set('.event__offer-title', title);
  }

  setPrice(price) {
    return this.set('.event__offer-price', price);
  }
}

customElements.define('trip-offer-selector', OfferSelectorView);
