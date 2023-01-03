import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));

    }

    _getInputValues() {
        this._formInputValues = {};
        this._inputList.forEach(input => this._formInputValues[input.name] = input.value);
        return this._formInputValues;
    }
    
    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          });
         
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}