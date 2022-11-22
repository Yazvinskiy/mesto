import {initialCards} from './cards.js';
import {enableValidate} from './validate.js';
import {offDisableSubmit} from './validate.js';
import {onDisableSubmit} from './validate.js';


const POPUP_OPENED_CLASS = 'popup_opened';
const inputCardTitle = document.querySelector(".popup__input_card_title");
const inputLinkCard = document.querySelector(".popup__input_card_link");
const formAddCard = document.querySelector(".popup__form-card");
const sectionPlace = document.querySelector(".places");
const cardTemplate = document.querySelector('#template-cards').content;
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const popupCloseBtn = document.querySelectorAll(".popup__btn-close");
const formEditProfile = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_user_name");
const inputProfession = document.querySelector(".popup__input_user_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImg = document.querySelector(".popup__image");
const popupFullImgCaption = document.querySelector(".popup__caption");
const popupBtnSubmit = document.querySelector('.popup__btn-save');
const popups = document.querySelectorAll('.popup');


function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.places__card').cloneNode(true);
  const cardElementImg = cardTemplate.querySelector('.places__image');
  const imgWrapper = cardElement.querySelector('.div__img');
  const removeButton = cardElement.querySelector(".places__icon-basket");
  const likeButton = cardElement.querySelector('.places__icon-like');
  cardElementImg.src = link;
  cardElementImg.alt = name;
  cardElement.querySelector('.places__title').textContent = name;
  removeButton.addEventListener("click", () => removeCard(cardElement));
  likeButton.addEventListener("click", () => likeCard(likeButton));
  

  imgWrapper.addEventListener('click', function (event) {
    const currentCard = event.target;   
    const name = currentCard.alt;
    const link = currentCard.src;
    popupImg.setAttribute('src', link);
    popupFullImgCaption.setAttribute('alt', name);
    popupFullImgCaption.textContent = name;
    openPopup( popupFullImage);
  });
 return cardElement;
}

function initSections() {
  initialCards.forEach(element => {
    const newCard = createCard(element.name, element.link);
    addCard(newCard);
  });
}

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.body.addEventListener('keydown', closePopupByEsc); 
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  //removeDisabledOnBtn (popupEditProfile.querySelector('.popup__btn-save')); 
  //offDisableSubmit(popupBtnSubmit); /// OFF DISABLE SUBMIT 
  openPopup(popupEditProfile);
}

function openPopupPlace() {
  openPopup(popupPlace);
}

function likeCard(cardElement) {
  cardElement.classList.toggle('places__icon-like_active');
}

function submitEditProfilePopup(evt) {
  evt.preventDefault(evt);
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}

const handleSubmitCard = (event) => {
  event.preventDefault();
  const newCardTitle = inputCardTitle.value;
  const newCardLink = inputLinkCard.value;
  const newCard = createCard(newCardTitle, newCardLink);
  addCard(newCard);
  //onDisableSubmit(popupBtnSubmit); /// DISABLE SUBMIT AFTER ADD CARD
  closePopup(popupPlace);
  resetForm(formAddCard);
}

function addCard(cardsElement) {
  sectionPlace.prepend(cardsElement);
}

const removeCard = (element) => {
  element.remove();
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

function resetForm(form) {
  form.reset();
}

popupBtnEdit.addEventListener('click',  openEditProfilePopup); 
popupBtnAdd.addEventListener('click',  openPopupPlace);   
formEditProfile.addEventListener('submit', submitEditProfilePopup);
formAddCard.addEventListener("submit", handleSubmitCard);
initSections();

