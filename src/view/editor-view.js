import {html} from './view.js';
import CreatorView from './creator-view.js';

export default class EditorView extends CreatorView {
  constructor() {
    super();

    /** @type {HTMLButtonElement} */
    this.closeButtonView = this.querySelector('.event__rollup-btn');

    /** @type {HTMLButtonElement} */
    this.deleteButtonView = this.querySelector('.event__reset-btn');
  }

  /**
   * @override
   */
  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @override
   */
  connect() {
    this.targetView.replaceWith(this);
  }

  /**
   * @override
   */
  disconnect() {
    this.replaceWith(this.targetView);
  }

  onClick(event) {
    if (event.target === this.closeButtonView) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
