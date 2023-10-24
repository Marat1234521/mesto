import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handler) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this.setFormSubmitHandler = handler;
    }



    setEventListeners(card) {
        console.log('setEventListeners');
        super.setEventListeners(card);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log('нажали');
            this.setFormSubmitHandler(card);
            super.close();
        });
    }
}