import 'flatpickr/dist/flatpickr.min.css';

import initCalendar from 'flatpickr';
import ComponentView, {html} from './component-view.js';

/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

export default class DatePickerView extends ComponentView {
  #startDateCalendar;
  #endDateCalendar;

  constructor() {
    super(...arguments);

    const options = {
      'enableTime': true,
      'time_24hr': true
    };

    this.#startDateCalendar = initCalendar(
      this.querySelector('[name="event-start-time"]'),
      {
        ...options,
        onChange: [(selectedDates) =>
          this.#endDateCalendar.set('minDate', selectedDates[0])]
      }
    );

    this.#endDateCalendar = initCalendar(
      this.querySelector('[name="event-end-time"]'),
      {
        ...options,
        onChange: [(selectedDates) =>
          this.#startDateCalendar.set('maxDate', selectedDates[0])]
      }
    );

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

  configure(options) {
    this.#startDateCalendar.set(options);
    this.#endDateCalendar.set(options);

    return this;
  }

  getStartDate() {
    return this.#startDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} value
   */
  setStartDate(value) {
    this.#startDateCalendar.setDate(value);
    return this;
  }

  getEndDate() {
    return this.#endDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} value
   */
  setEndDate(value) {
    this.#endDateCalendar.setDate(value);
    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);
