import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popupSelector.querySelector('.picture');
        this._popupTitle = this._popupSelector.querySelector('.popup__title');
    }

    open(name, link) {
        this._popupTitle.textContent = name;
        this._popupImg.src = link;
        this._popupImg.alt = name;
        super.open();
    }
}