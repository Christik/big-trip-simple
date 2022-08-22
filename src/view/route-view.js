import ComponentView from './component-view.js';

export default class RouteView extends ComponentView {
  /** @param {...HTMLElement} views */
  replaceContent(...views) {
    this.replaceChildren(...views);

    return this;
  }
}

document.querySelector(String(RouteView));

customElements.define(String(RouteView), RouteView);
