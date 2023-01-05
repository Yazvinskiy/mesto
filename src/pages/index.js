import "../pages/index.css";
import { initialCards, configValidation } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  formAddCard,
  sectionPlace,
  popupBtnEdit,
  popupBtnAdd,
  popupEditProfile,
  popupPlace,
  formEditProfile,
  inputName,
  inputProfession,
  profileName,
  profileProfession,
  popupFullImage,
} from "../utils/constants.js";

function createCard(data) {
  const card = new Card(data, "#template-cards", handleOpenPopupImg);
  const cardElement = card.generateCard();

  return cardElement;
}

const cardList = new Section(
  {
    render: (data) => {
      const card = createCard(data);
      cardList.addItem(card);
    },
  },
  sectionPlace
);

cardList.renderer(initialCards);

const formProfileValidation = new FormValidator(
  configValidation,
  formEditProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(configValidation, formAddCard);
formCardValidation.enableValidation();

const popupWithImage = new PopupWithImage(popupFullImage);
function handleOpenPopupImg(name, link) {
  popupWithImage.openPopupImg(name, link);
}

popupWithImage.setEventListeners();

const addCardPlaceForm = new PopupWithForm(popupPlace, {
  handleFormSubmit: (inputValues) => {
    const card = createCard(inputValues);
    cardList.addItem(card);
    addCardPlaceForm.close();
  },
});

addCardPlaceForm.setEventListeners();

const user = new UserInfo(profileName, profileProfession);

const popupUserProfile = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (userData) => {
    user.setUserInfo(userData);
    popupUserProfile.close();
  },
});

popupUserProfile.setEventListeners();

popupBtnEdit.addEventListener("click", () => {
  formProfileValidation.resetValidation();
  const { job, name } = user.getUserInfo();
  inputName.value = name;
  inputProfession.value = job;
  popupUserProfile.open();
});

popupBtnAdd.addEventListener("click", () => {
  formCardValidation.resetValidation();
  addCardPlaceForm.open();
});
