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
  popupBtnEdit,
  popupBtnAdd,
  formEditProfile,
  inputName,
  inputProfession,
  avatarButton,
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

const user = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    user.setUserInfo(userData);
    user.setUserAvatar(userData);
    cardList.renderer(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithConformation = new PopupWithConformation(
  ".popup_type_confirmation"
);
popupWithConformation.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_type_full-image");
popupWithImage.setEventListeners();

function handleOpenPopupImg(name, link) {
  popupWithImage.openPopupImg(name, link);
}

function createCard(data) {
  const card = new Card(
    data,
    "#template-cards",
    handleOpenPopupImg,
    (id) => {
      popupWithConformation.open(async () => {
        try {
          await api.deleteCard(id);
          card.removeCard();
          popupWithConformation.close();
        } catch (err) {
          console.log(err);
        }
      });
    },
    async (data, isLiked) => {
      try {
        if (isLiked) {
          data = await api.dislikeCard(data._id);
          card.showLike(data);
        } else {
          data = await api.likeCard(data._id);
          card.showLike(data);
        }
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
      cardList.addItem(createCard(data));
    },
  },
  ".places"
);

///Add new card
const popupAddCardPlace = new PopupWithForm(
  ".popup_type_place",
  async (inputValues) => {
    try {
      popupAddCardPlace.setElementContent("Coздать...");
      const data = await api.createCard(inputValues);
      popupAddCardPlace.close();
      cardList.addItem(createCard(data));
    } catch (err) {
      console.log(err);
    } finally {
      popupAddCardPlace.setElementContent("Создать");
    }
  }
);

popupAddCardPlace.setEventListeners();

popupBtnAdd.addEventListener("click", () => {
  formCardValidation.resetValidation();
  popupAddCardPlace.open();
});

///PopupWithAvatar
const popupAvatarProfile = new PopupWithForm(
  ".popup_type_avatar",
  async (data) => {
    try {
      popupAvatarProfile.setElementContent("Cохранить...");
      const avatar = await api.editAvatar(data.link);
      user.setUserAvatar(avatar);
      popupAvatarProfile.close();
    } catch (err) {
      console.log(err);
    } finally {
      popupAvatarProfile.setElementContent("Cохранить");
    }
  }
);

popupAvatarProfile.setEventListeners();

avatarButton.addEventListener("click", () => {
  formAvatarValidation.resetValidation();
  popupAvatarProfile.open();
});

//PopupInfoUser
const popupUserProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  async (userData) => {
    try {
      popupUserProfile.setElementContent("Cохранить...");
      const data = await api.setUserData(userData);
      user.setUserInfo(data);
      popupUserProfile.close();
    } catch (err) {
      console.log(err);
    } finally {
      popupUserProfile.setElementContent("Cохранить");
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
