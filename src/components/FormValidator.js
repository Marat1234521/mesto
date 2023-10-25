export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
  }
  
  _showInputError (inputElement, errorMessage) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.errorClass);
  };
  
  _hideInputError (inputElement) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  
  };
  
  _setEventListeners () {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      }.bind(this));
      
    });
  };
  
  _resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation () {
    
    this._setEventListeners ();
    this._formElement.addEventListener('submit', (evt) => {
      this._resetValidation();
      evt.preventDefault();
    });
      this._toggleButtonState();

  };
  
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  };
  
  _toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  
}


