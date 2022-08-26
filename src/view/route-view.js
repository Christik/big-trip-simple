import ComponentView from './component-view.js';

export default class RouteView extends ComponentView {
  /** @param {...HTMLElement} views */
  replaceContent(...views) {
    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(RouteView), RouteView);
