import "../pages/index.css";
import { configValidation } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConformation from "../components/PopupWithConformation.js";
import Api from "../components/Api.js";

import {
  formAddCard,
  formAvatar,
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
  avatarButton,
  popupAvatar,
  popupConformation,
} from "../utils/constants.js";

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "bc878a11-0bea-4fbc-ba4a-3af30d25199d",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);

let userId;

const user = new UserInfo(profileName, profileProfession);

Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    userId = userData._id;
    user.setUserInfo(userData);
    user.setUserAvatar(userData.avatar);
    cardList.renderer(initialCards);
  }
);

const popupWithConformation = new PopupWithConformation(popupConformation);
popupWithConformation.setEventListeners();

const popupWithImage = new PopupWithImage(popupFullImage);
popupWithImage.setEventListeners();

function handleOpenPopupImg(name, link) {
  popupWithImage.openPopupImg(name, link);
}

function createCard(data) {
  const card = new Card(
    data,
    "#template-cards",
    handleOpenPopupImg,
    async (id) => {
      popupWithConformation.open(() => {
        api.deleteCard(id);
        card.removeCard();
        popupWithConformation.close();
      });
    },
    async (data, userId) => {
      try {
        data.likes.some((i) => i._id === userId)
          ? await api.dislikeCard(data._id)
          : await api.likeCard(data._id);
      } catch (err) {
        console.log(err);
      }
    },
    userId
  );
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

///Add new card
const addCardPlaceForm = new PopupWithForm(popupPlace, async (inputValues) => {
  await api.createCard(inputValues).then((data) => cardList.addItem(data));
  addCardPlaceForm.close();
});

addCardPlaceForm.setEventListeners();

popupBtnAdd.addEventListener("click", () => {
  formCardValidation.resetValidation();
  addCardPlaceForm.open();
});

///PopupWithAvatar
const popupAvatarProfile = new PopupWithForm(popupAvatar, async (data) => {
  try {
    await api.editAvatar(data.link).then((data) => {
      user.setUserAvatar(data.avatar);
    });
    popupAvatarProfile.close();
  } catch (err) {
    console.log(err);
  }
});

popupAvatarProfile.setEventListeners();

avatarButton.addEventListener("click", () => {
  formAvatarValidation.resetValidation();
  popupAvatarProfile.open();
});

//PopupInfoUser
const popupUserProfile = new PopupWithForm(
  popupEditProfile,
  async (userData) => {
    try {
      await api.setUserData(userData);
      popupUserProfile.close();
    } catch (err) {
      console.log(err);
    }
  }
);

popupUserProfile.setEventListeners();

popupBtnEdit.addEventListener("click", () => {
  formProfileValidation.resetValidation();
  const { about, name } = user.getUserInfo();
  inputName.value = name;
  inputProfession.value = about;
  popupUserProfile.open();
});

// Forms validation
const formProfileValidation = new FormValidator(
  configValidation,
  formEditProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(configValidation, formAddCard);
formCardValidation.enableValidation();

const formAvatarValidation = new FormValidator(configValidation, formAvatar);
formAvatarValidation.enableValidation();
