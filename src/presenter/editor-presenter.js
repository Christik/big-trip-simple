/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/editor-view').default} EditorView */

import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import { getOfferSelectOptions } from '../utils.js';

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
      this.view.destinationInputView.addEventListener('destination-change', this);

    });
  }

  handleEvent(event) {
    if (event.type === 'type-change') {
      const type = event.detail;
      const typeLabel = TypeLabel[Type.findKey(type)];
      const offerSelectOptions = getOfferSelectOptions(
        this.model.getAvailableOffers(type)
      );

      this.view.destinationInputView.setLabel(typeLabel);
      this.view.offerSelectView.setOptions(offerSelectOptions);
    }

    if (event.type === 'destination-change') {
      // console.log(event.detail);
    }
  }
}
