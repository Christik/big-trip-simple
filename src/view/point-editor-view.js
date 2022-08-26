import ComponentView, { html } from './component-view.js';
import TypeSelectView from './form/type-select-view.js';
import DestinationInputView from './form/destination-input-view.js';
import OfferSelectView from './form/offer-select-view.js';
import DestinationDetailsView from './form/destination-details-view.js';
import PriceInputView from './form/price-input-view.js';
import DatePickerView from './form/date-picker-view.js';
import { isKeyEscape } from '../utils.js';

export default class PointEditorView extends ComponentView {
  #linked = null;

  constructor() {
    super();

    this.bodyView = this.querySelector('.event__details');
    this.offersContainerView = this.querySelector('.event__section--offers');
    this.offerListView = this.querySelector('.event__available-offers');
    this.expandButtonView = this.querySelector('.event__rollup-btn');

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));

    /** @type {DestinationInputView} */
    this.destinationInputView = this.querySelector(String(DestinationInputView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationDetailsView} */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));

    this.expandButtonView.addEventListener('click', () => {
      this.close();
    });
  }

  /** @override */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationInputView}
          ${DatePickerView}
          ${PriceInputView}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DestinationDetailsView}
        </section>
      </form>
    `;
  }

  /** @param {HTMLElement} view */
  link(view) {
    this.#linked = view;

    return this;
  }

  open() {
    this.#linked.replaceWith(this);
    document.addEventListener('keydown', this);

    return this;
  }

  close() {
    this.replaceWith(this.#linked);
    document.removeEventListener('keydown', this);

    return this;
  }

  handleEvent(event) {
    if (isKeyEscape(event)) {
      this.close();
    }
  }
}

customElements.define(String(PointEditorView), PointEditorView);
