export default class Section {
  constructor({ render }, container) {
    this._render = render;
    this._container = container;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderer(items) {
    items.forEach((item) => this._render(item));
  }
}
