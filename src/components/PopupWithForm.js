import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formPopup = this._popup.querySelector('.form');
        this._inputList = Array.from(this._formPopup.querySelectorAll('.form__input'));
        this.buttonSubmitText = this._formPopup.querySelector('.form__submit').textContent;
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

    renderLoading(load) { 
        if (load) {
            this.buttonSubmitText = "Сохранение...";
        } else {
            this.buttonSubmitText = this.buttonSubmitText
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}