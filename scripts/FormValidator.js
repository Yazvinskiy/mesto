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
  /*
   const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  }
  
  const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
  
  const checkInputValidity = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement);
    }
  }
  
  export function disableSaveButton(config, buttonElement) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true; 
  }
  
  export function enableSaveButton(config, buttonElement) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false; 
  }
  
  const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      disableSaveButton(config, buttonElement);
    } else {
      enableSaveButton(config, buttonElement);
    }
  }
  
  const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(config, inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      });
  
    });
  }
  
  export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(config, formElement);
    });
  }
  */
