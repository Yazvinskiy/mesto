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

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    user.setUserInfo(userData);
    user.setUserAvatar(userData.avatar);
    cardList.renderer(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

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
    async (data, isLiked) => {
      try {
        if (isLiked) {
          data = await api.dislikeCard(data._id);
          card.show(data);
        } else {
          data = await api.likeCard(data._id);
          card.show(data);
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
  sectionPlace
);

///Add new card
const addCardPlaceForm = new PopupWithForm(popupPlace, async (inputValues) => {
  try {
    addCardPlaceForm.setElementContent("Coздать...");
    const data = await api.createCard(inputValues);
    addCardPlaceForm.close();
    cardList.addItem(createCard(data));
  } catch (err) {
    console.log(err);
  } finally {
    addCardPlaceForm.setElementContent("Создать");
  }
});

addCardPlaceForm.setEventListeners();

popupBtnAdd.addEventListener("click", () => {
  formCardValidation.resetValidation();
  addCardPlaceForm.open();
});

///PopupWithAvatar
const popupAvatarProfile = new PopupWithForm(popupAvatar, async (data) => {
  try {
    const avatarLink = await api.editAvatar(data.link);
    user.setUserAvatar(avatarLink);
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
