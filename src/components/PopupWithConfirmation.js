import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handler) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
    }

    setSubmitHandler(handler) { 
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