/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/editor-view').default} EditorView */

import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';

export default class EditorPresenter {
  /**
   * @param {RouteModel} model
   * @param {EditorView} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.ready().then(() => {

      this.view.typeSelectView.addEventListener('type-change', this);

    });
  }

  handleEvent(event) {
    if (event.type === 'type-change') {
      const type = event.detail;
      const typeLabel = TypeLabel[Type.findKey(type)];

      this.view.destinationInputView.setLabel(typeLabel);
    }
  }
}
