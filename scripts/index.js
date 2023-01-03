import {initialCards, configValidation} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo  from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';




const POPUP_OPENED_CLASS = 'popup_opened';
const inputCardTitle = document.querySelector(".popup__input_card_title");
const inputLinkCard = document.querySelector(".popup__input_card_link");
const formAddCard = document.querySelector(".popup__form-card");
const sectionPlace = document.querySelector(".places");
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupPlace = document.querySelector(".popup_type_place");
const popupCloseBtn = document.querySelectorAll(".popup__btn-close");
const formEditProfile = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_user_name");
const inputProfession = document.querySelector(".popup__input_user_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const popups = document.querySelectorAll('.popup');
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImg = document.querySelector(".popup__image");
const popupFullImgCaption = document.querySelector(".popup__caption");


function createCard(data) {
  const card = new Card(data, '#template-cards', handleOpenPopupImg);
    const cardElement = card.generateCard();

    return cardElement;
}


const cardList = new Section({

  render: (data) => {
    const card = createCard(data);
    cardList.addItem(card);
  }
  
}, sectionPlace);

cardList.renderer(initialCards);


const popupWithImage = new PopupWithImage(popupFullImage);
//popupWithImage.setEventListeners();
function handleOpenPopupImg(name, link) {
  popupWithImage.openPopupImg(name, link);
}


const addCardPlaceForm = new PopupWithForm(popupPlace, {
  
  handleFormSubmit: (inputValues) => {
    
    const card = createCard(inputValues);
    
    cardList.addItem(card);
    addCardPlaceForm.close();
    
  }
}

);


const formProfileValidation = new FormValidator(configValidation, formEditProfile);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(configValidation, formAddCard);
formCardValidation.enableValidation();


const user = new UserInfo(profileName, profileProfession)

/*
function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  formProfileValidation.resetValidation();
  openPopup(popupEditProfile);
}



/*
function submitEditProfilePopup(evt) {
  evt.preventDefault(evt);
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}




const handleSubmitCard = (event) => {
  event.preventDefault();
  const newCard = createCard({name: inputCardTitle.value,
              link: inputLinkCard.value});
 // addCard(newCard);
  //closePopup(popupPlace);
  formAddCard.reset();
}
/*

function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.removeEventListener('keydown', closePopupByEsc);
  
}

 function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.addEventListener('keydown', closePopupByEsc); 
}

function closePopupByEsc(evt) {
  if(evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened')); 
  }

  }

popupCloseBtn.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains(POPUP_OPENED_CLASS)) {
      closePopup(evt.target);
    }
  });   

});
*/
//popupBtnEdit.addEventListener('click',  openEditProfilePopup); 
popupBtnAdd.addEventListener('click', () => {
  formCardValidation.resetValidation();
  addCardPlaceForm.open();
});   
//formEditProfile.addEventListener('submit', submitEditProfilePopup);
//formAddCard.addEventListener('submit',  addCardPlaceForm);
