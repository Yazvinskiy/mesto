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

 function enableDisabledBtn(config, buttonElement) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disable = true;
}

function removeDisabledOnBtn(config, buttonElement) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disable = false;
}

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    enableDisabledBtn(config, buttonElement);
  } else {
    removeDisabledOnBtn(config, buttonElement);
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

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
}

export const enableValidate = 
enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

export const offDisableSubmit = function removeDisabledOnBtn(config, buttonElement) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disable = false;
}

export const onDisableSubmit =  function enableDisabledBtn(config, buttonElement) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disable = true;
}
