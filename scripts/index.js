import {initialCards, configValidation} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


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



function createCard(data) {
  const card = new Card(data, '#template-cards');
    const cardsElement = card.generateCard();

    sectionPlace.prepend(cardsElement);
}

  initialCards.forEach(item => createCard(item));


export function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.body.addEventListener('keydown', closePopupByEsc); 
}

const formProfileValidation = new FormValidator(configValidation, formEditProfile);
formProfileValidation.enableValidation();

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;

  openPopup(popupEditProfile);
}

function openPopupPlace() {
  openPopup(popupPlace);
}

function submitEditProfilePopup(evt) {
  evt.preventDefault(evt);
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}

const formCardValidation = new FormValidator(configValidation, formAddCard);
formCardValidation.enableValidation();

const handleSubmitCard = (event) => {
  event.preventDefault();
  createCard({name: inputCardTitle.value,
              link: inputLinkCard.value});
              
  closePopup(popupPlace);
  formAddCard.reset();
  formCardValidation.enableValidation();
}


function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.body.removeEventListener('keydown', closePopupByEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains(POPUP_OPENED_CLASS)) {
      closePopup(evt.target);
    }
  });   

});

function closePopupByEsc(evt) {
  if(evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened')); 
  }

  }

popupCloseBtn.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


popupBtnEdit.addEventListener('click',  openEditProfilePopup); 
popupBtnAdd.addEventListener('click',  openPopupPlace);   
formEditProfile.addEventListener('submit', submitEditProfilePopup);
formAddCard.addEventListener('submit', handleSubmitCard);
