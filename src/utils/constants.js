export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const formAddCard = document.querySelector(".popup__form-card");
export const formEditProfile = document.querySelector(".popup__form");
export const sectionPlace = document.querySelector(".places");
export const popupBtnEdit = document.querySelector(".profile__edit-button");
export const popupBtnAdd = document.querySelector(".profile__add-button");
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const popupPlace = document.querySelector(".popup_type_place");
export const inputName = document.querySelector(".popup__input_user_name");
export const inputProfession = document.querySelector(".popup__input_user_profession");
export const profileName = document.querySelector(".profile__title");
export const profileProfession = document.querySelector(".profile__subtitle");
export const popupFullImage = document.querySelector(".popup_type_full-image");

export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
