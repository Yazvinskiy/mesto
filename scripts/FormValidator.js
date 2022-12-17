export class FormValidator {
 
  constructor(configValidation, formValidation) {
      this._formSelector = configValidation.formSelector;
      this._inputSelector = configValidation.inputSelector;
      this._submitButtonSelector = configValidation.submitButtonSelector;
      this._inactiveButtonClass = configValidation.inactiveButtonClass;
      this._inputErrorClass = configValidation.inputErrorClass;
      this._errorClass = configValidation.errorClass;
    
      this._formValidation = formValidation;
  }
  
  
   _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
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
  
   _disableSaveButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true; 
  }
  
  _enableSaveButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false; 
  }
  
  _toggleButtonState(inputList, buttonElement)  {
    if (this._hasInvalidInput(inputList)) {
      this._disableSaveButton(buttonElement);
    } else {
      this._enableSaveButton(buttonElement);
    }
  }
 
  _setEventListeners () {
    const inputList = Array.from(this._formValidation.querySelectorAll(this._inputSelector));
    const buttonElement = this._formValidation.querySelector(this._submitButtonSelector);
  
    this._toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
  
    });
  }
  
  enableValidation() {
  this._setEventListeners();
  }
  
  }
  
