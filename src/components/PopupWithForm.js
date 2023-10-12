import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formPopup = this._popupSelector.querySelector('.form');
        this._inputList = Array.from(this._formPopup.querySelectorAll('.form__input'));
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.id] = input.value);
        return this._formValues; 
    }

    close() {
        super.close();
        this._formPopup.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}