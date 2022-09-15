import Mode from '../enum/mode.js';
import CreatorPresenter from './creator-presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends {CreatorPresenter<Model,View>}
 */
export default class EditorPresenter extends CreatorPresenter {
  /**
   * @override
   */
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
      this.view.close(true);
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setDeleteButtonPressed(true);

    try {
      await this.model.points.remove(this.model.activePoint.id);
      this.view.close();

    } catch (exception) {
      // shake
    }

    this.view.setDeleteButtonPressed(false);
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.view.setSaveButtonPressed(true);

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setSaveButtonPressed(false);
  }
}
