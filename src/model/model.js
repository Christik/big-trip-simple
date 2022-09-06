export default class Model extends EventTarget {
  async ready() {}

  /**
   * @param {string | string[]} type
   * @param {EventListener | EventListenerObject} listener
   * @param {boolean | EventListenerOptions} options
   */
  addEventListener(type, listener, options) {
    [].concat().forEach((name) => {
      super.addEventListener(name, listener, options);
    });
  }
}
