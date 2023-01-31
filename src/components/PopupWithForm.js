import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._buttonSubmit = this._formElement.querySelector(".popup__btn-save");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formInputValues = {};
    this._inputList.forEach(
      (input) => (this._formInputValues[input.name] = input.value)
    );

    return this._formInputValues;
  }

  loadDataIndicator(str) {
    this._buttonSubmit.textContent += str;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
