export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  render() {
    this.clear();
    const reversItems = this._renderedItems.reverse();
    reversItems.forEach(item => {this._renderer(item)});    
  }

  addItem(item) {
    this._container.prepend(item);
  }
}