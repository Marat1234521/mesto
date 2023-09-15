class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
  }
  
  // _showInputError (inputElement, errorMessage) { 
  //   const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  //   inputElement.classList.add(this._selectors.inputErrorClass);
  //   errorElement.textContent = errorMessage;
  //   errorElement.classList.add(this._selectors.errorClass);
  // };
  
  _hideInputError (inputElement) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  };
  
  // checkInputValidity (inputElement) {
  //   if (!inputElement.validity.valid) {
  //     this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
  //   } else {
  //     this._hideInputError(this._formElement, inputElement);
  //   }
  // };
  
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this.toggleButtonState(inputList, buttonElement);
    const formElement = this._formElement;
    const selectors = this._selectors;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        if (!inputElement.validity.valid) {
          const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
          inputElement.classList.add(selectors.inputErrorClass);
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(selectors.errorClass);
        } else {
          const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
          inputElement.classList.remove(selectors.inputErrorClass);
          errorElement.classList.remove(selectors.errorClass);
          errorElement.textContent = '';
        }
        if (inputList.some((inputElement) => {
          return !inputElement.validity.valid;
          })) {
          buttonElement.classList.add(selectors.inactiveButtonClass);
          buttonElement.style.disabled = true;
        } else {
          buttonElement.classList.remove(selectors.inactiveButtonClass);
          buttonElement.style.disabled = false; 
        }
      });
      
    });
  };
  
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      this._setEventListeners(this._formElement);
  };
  
  // _hasInvalidInput (inputList) {
  //   return inputList.some((inputElement) => {
  //   return !inputElement.validity.valid;
  // }); 
  // };
  
  toggleButtonState (inputList, buttonElement) {
    if (inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      })) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
      buttonElement.style.disabled = true;
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.style.disabled = false; 
    }
  }
  
}


