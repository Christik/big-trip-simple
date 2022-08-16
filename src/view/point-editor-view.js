import BaseView from './base-view.js';
import { createPointEditorTemplate } from './point-editor-template.js';

export default class PointEditorView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createPointEditorTemplate();
  }
}

customElements.define('trip-point-editor', PointEditorView);
