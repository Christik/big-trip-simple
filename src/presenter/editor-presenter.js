import Mode from '../enum/mode.js';
import CreatorPresenter from './creator-presenter.js';

const DeleteButtonText = {
  ACTIVE: 'Delete',
  INACTIVE: 'Deleting...'
};

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends {CreatorPresenter<Model,View>}
 */
export default class EditorPresenter extends CreatorPresenter {
  toggleDeleteDisabled() {
    this.toggleButtonDisabled(this.view.deleteButtonView, DeleteButtonText);
  }

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
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.toggleDeleteDisabled();

    try {
      await this.model.points.remove(this.model.activePoint.id);
      this.view.close();

    } catch (exception) {
      // shake
    }

    this.toggleDeleteDisabled();
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.toggleSubmitDisabled();

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
      this.view.close();

    } catch (exception) {
      // shake
    }

    this.toggleSubmitDisabled();
  }
}
