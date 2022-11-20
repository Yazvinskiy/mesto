import {submitButtonIndisibled} from './validate.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const inputCardTitle = document.querySelector(".popup__input_card_title");
const inputLinkCard = document.querySelector(".popup__input_card_link");
const formAddCard = document.querySelector(".popup__form-card");
const sectionPlace = document.querySelector(".places");
const cardsTemplate = document.querySelector('#template-cards').content;
const POPUP_OPENED_CLASS = 'popup_opened';
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn = document.querySelectorAll(".popup__btn-close");
const formEditProfile = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_user_name");
const inputProfession = document.querySelector(".popup__input_user_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImg = document.querySelector(".popup__image");
const popupFullImgCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll('.popup');




function createCard(name, link) {
  const cardsElement = cardsTemplate.querySelector('.places__card').cloneNode(true);
  const cardsElementImg = cardsTemplate.querySelector('.places__image');
  const imgWrapper = cardsElement.querySelector('.div__img');
  const removeButton = cardsElement.querySelector(".places__icon-basket");
  const likeButton = cardsElement.querySelector('.places__icon-like');
  cardsElementImg.src = link;
  cardsElementImg.alt = name;
  cardsElement.querySelector('.places__title').textContent = name;
  removeButton.addEventListener("click", () => removeCard(cardsElement));
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
 return cardsElement;
}

function initSections() {
  initialCards.forEach(element => {
    const newCard = createCard(element.name, element.link);
    addCard(newCard);
  });
}

//open popups
function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.body.addEventListener('keydown', closePopupByEsc); 
}


function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  submitButtonIndisibled(popupEditProfile.querySelector('.popup__btn-save')); 
  openPopup(popupEditProfile);
}

function openPopupPlace() {
  openPopup(popupPlace);
}


function likeCard(cardsElement) {
  cardsElement.classList.toggle('places__icon-like_active');
};


function submitEditProfilePopup(evt) {
  evt.preventDefault(evt);
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}

// submit cards
const handleSubmitCard = (event) => {
  event.preventDefault();
  const newCardTitle = inputCardTitle.value;
  const newCardLink = inputLinkCard.value;
  const newCard = createCard(newCardTitle, newCardLink);
  addCard(newCard);
  closePopup(popupPlace);
  resetForm();
}

function addCard(cardsElement) {
sectionPlace.prepend(cardsElement);
resetForm();
};

//delete cards
const removeCard = (element) => {
  element.remove();
}

function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.body.removeEventListener('keydown', closePopupByEsc);
  
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => closePopup(evt.target)); 
})

function closePopupByEsc(evt) {
  if(evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened')); //? 
  }
  }

popupCloseBtn.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function resetForm() {
  inputCardTitle.value = "";
  inputLinkCard.value = "";
}

popupBtnEdit.addEventListener('click',  openEditProfilePopup); 
popupBtnAdd.addEventListener('click',  openPopupPlace);   
formEditProfile.addEventListener('submit', submitEditProfilePopup);
formAddCard.addEventListener("submit", handleSubmitCard);
initSections();





