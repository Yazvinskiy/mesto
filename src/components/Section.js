export default class Section {
    constructor({render}, containerSelector) {
        this._render = render;
        this._container = containerSelector;
    }

    addItem(item) {
        this._container.prepend(item);
    }


    renderer(items) {
        items.forEach(item =>  this._render(item));
    }
    
}