import 'flatpickr/dist/flatpickr.min.css';

import initCalendar from 'flatpickr';
import ComponentView, {html} from './component-view.js';

/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

export default class DatePickerView extends ComponentView {
  startDateCalendar;
  endDateCalendar;

  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
        value=""
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="event-end-time"
        value=""
      >
    `;
  }

  init(options = {}) {
    this.startDateCalendar = initCalendar(
      this.querySelector('[name="event-start-time"]'),
      options
    );

    this.endDateCalendar = initCalendar(
      this.querySelector('[name="event-end-time"]'),
      options
    );
  }

  getStartDate() {
    return this.startDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} value
   */
  setStartDate(value) {
    const date = new Date(value);

    this.startDateCalendar.setDate(date);

    return this;
  }

  getEndDate() {
    return this.endDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} value
   */
  setEndDate(value) {
    const date = new Date(value);

    this.endDateCalendar.setDate(date);

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);
