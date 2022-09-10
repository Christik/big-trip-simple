import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {Element} View
 * @extends {Presenter<Model,View>}
 */
export default class PlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);
  }

  setMessage(text) {
    this.view.textContent = text;
  }
}
