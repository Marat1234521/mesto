import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
    }

    setFormSubmitHandler(handler) {
        this.setFormSubmitHandler = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.setFormSubmitHandler();
        });
    }
}