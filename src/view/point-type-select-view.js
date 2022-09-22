import KeyboardCommand from '../enum/keyboard-command.js';
import RadioGroupView, {html} from './radio-group-view.js';

export default class PointTypeSelectView extends RadioGroupView {
  constructor() {
    super(...arguments);

    /**
     * @type {HTMLInputElement}
     */
    this.toggleView = this.querySelector('.event__type-toggle');

    this.classList.add('event__type-wrapper');

    this.addEventListener('click', this.onClick);
    this.addEventListener('change', this.onChange);
    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('blur', this.onBlur, true);
    this.addEventListener('pointerdown', this.onPointerDown);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * @override
   */
  getValue() {
    /** @type {HTMLInputElement} */
    const checkedInputView = this.querySelector('[type="radio"]:checked');

    return checkedInputView.value;
  }

  /**
   * @override
   * @param {string} type
   */
  setValue(type) {
    super.setValue(type);
    this.setIcon(type);

    return this;
  }

  /**
   * @override
   * @param {number} index
   */
  setIndex(index) {
    super.setIndex(index);
    this.setIcon(this.getValue());

    return this;
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="0">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" tabindex="-1">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        </fieldset>
      </div>
    `;
  }

  createOptionTemplate(label, value) {
    return html`
      <div class="event__type-item">
        <input
          id="event-type-${value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${value}"
          tabindex="-1"
        >
        <label
          class="event__type-label event__type-label--${value}"
          for="event-type-${value}-1"
        >
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {string} type
   */
  setIcon(type) {
    this.querySelector('img').src = `img/icons/${type}.png`;

    return this;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const templates = states.map((state) => this.createOptionTemplate(...state));

    this.querySelector('.event__type-group')
      .insertAdjacentHTML('beforeend', templates.join(''));

    return this;
  }

  onClick(event) {
    if ([...this.inputViews].includes(event.target)) {
      this.setIcon(event.target.value);
      this.toggleView.checked = false;
    }
  }

  onChange(event) {
    if (event.target === this.toggleView) {
      event.stopImmediatePropagation();
    }
  }

  /**
   * @param {FocusEvent} event
   */
  onFocus(event) {
    if (event.target === this.toggleView.labels.item(0)) {
      this.toggleView.checked = true;
    }
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  onBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {PointerEvent} event
   */
  onPointerDown(event) {
    event.preventDefault();
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    if (KeyboardCommand.EXIT.includes(event.key) && this.toggleView.checked) {
      event.stopPropagation();

      this.toggleView.checked = false;

      return;
    }

    if (KeyboardCommand.NEXT.includes(event.key)) {
      event.preventDefault();

      this.setIndex(this.getIndex() + 1);

      return;
    }

    if (KeyboardCommand.PREVIOUS.includes(event.key)) {
      event.preventDefault();

      this.setIndex(this.getIndex() - 1);

      return;
    }

    if (KeyboardCommand.CONFIRM.includes(event.key)) {
      event.preventDefault();

      this.toggleView.checked = false;
    }
  }
}

customElements.define(String(PointTypeSelectView), PointTypeSelectView);
