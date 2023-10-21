import Api from "./Api.js";
// import {Card} from '../scripts/Card.js';
export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element);
    }
    
    renderItems(items) {
        items.forEach(item => this._renderer(item));
    }
}