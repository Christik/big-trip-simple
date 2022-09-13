import Mode from '../enum/mode.js';
import CreatorPresenter from './creator-presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends {CreatorPresenter<Model,View>}
 */
export default class EditorPresenter extends CreatorPresenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);
  }

  onModelModeChange() {
    if (this.model.getMode() === Mode.EDIT) {
      /** @type {PointView} */
      const linkedPointView = document.querySelector(
        `[data-id="${this.model.activePoint.id}"]`
      );

      this.point = this.model.activePoint;
      this.view.close(true);
      this.updateView();
      this.view
        .target(linkedPointView)
        .open();

      return;
    }

    if (this.model.getMode() === Mode.CREATE) {
      this.view.close();
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setRemovingMode();

    await this.model.points.remove(this.model.activePoint.id);
    this.view.close();

    this.view.unsetRemovingMode();
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
    } catch (exception) {
      // shake
    }
  }
}
