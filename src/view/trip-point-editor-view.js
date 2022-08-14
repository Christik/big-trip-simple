import BaseView from './base-view.js';
import { createAdjacentHtmlPointEditor } from './trip-point-editor-template.js';

export default class TripPointEditorView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtmlPointEditor(...arguments);
  }
}

customElements.define('trip-point-editor', TripPointEditorView);
