export default class FormValidator {
 
  constructor(configValidation, formValidation) {
      this._formSelector = configValidation.formSelector;
      this._inputSelector = configValidation.inputSelector;
      this._submitButtonSelector = configValidation.submitButtonSelector;
      this._inactiveButtonClass = configValidation.inactiveButtonClass;
      this._inputErrorClass = configValidation.inputErrorClass;
      this._errorClass = configValidation.errorClass;
    
      this._formValidation = formValidation;
  }
  
  
   _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formValidation.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }
  
  _hideInputError(inputElement)  {
    const errorElement = this._formValidation.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  
  _checkInputValidity(inputElement)  {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
   _disableSaveButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true; 
  }
  
  _enableSaveButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false; 
  }
  
  _toggleButtonState()  {
    if (this._hasInvalidInput()) {
      this._disableSaveButton();
    } else {
      this._enableSaveButton();
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement); 
    });
  }

  _setEventListeners () {
    this._inputList = Array.from(this._formValidation.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formValidation.querySelector(this._submitButtonSelector);
  
    this._toggleButtonState();  
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
  
    });
  }

  enableValidation() {
  this._setEventListeners();
  }
  
  }
  
