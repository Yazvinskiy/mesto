import Popup from "./Popup.js";

export default class PopupWithConformation extends Popup {
  constructor(popup) {
    super(popup);
    this._confirmBtn = this._popup.querySelector(".popup__btn-save");
  }

  open(handleSubmit) {
    super.open();
    this._handleSubmit = handleSubmit;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmBtn.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}
