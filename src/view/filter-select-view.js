import ComponentView, { html } from './component-view.js';
import FilterOptionView from './filter-option-view.js';

export default class FilterSelectView extends ComponentView {
  /**
   * @override
   */
  createTemplate() {
    return html`
    <form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new FilterOptionView(...state));

    this.querySelector('.trip-filters').prepend(...views);

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    const inputViews = this.querySelectorAll('input');

    flags.forEach((flag, index) => (inputViews[index].disabled = flag));

    return this;
  }

  /**
   * @param {string} value
   */
  select(value) {
    /** @type {HTMLInputElement} */
    const inputView = this.querySelector(`[value="${value}"]`);

    inputView.checked = true;

    return this;
  }
}

customElements.define(String(FilterSelectView), FilterSelectView);
