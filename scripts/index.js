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
const formCard = document.querySelector(".popup__form-card");
const sectionPlace = document.querySelector(".places");
const cardsTemplate = document.querySelector('#template-cards').content;
const POPUP_OPENED_CLASS = 'popup_opened';
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector(".popup__place");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn = document.querySelectorAll(".popup__btn-close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_user_name");
const inputProfession = document.querySelector(".popup__input_user_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const popupFullImage = document.querySelector(".popup-full-image");
const popupImg = document.querySelector(".popup__image");
const popupFullImgCaption = document.querySelector(".popup__caption");


function createCard(name, link) {
  const cardsElement = cardsTemplate.querySelector('.places__card').cloneNode(true);
  const cardsElementImg = cardsTemplate.querySelector('.places__image');
  cardsElement.querySelector('.places__title').textContent = name;
  const imgWrapper = cardsElement.querySelector('.div__img');
  cardsElementImg.src = link;
  cardsElementImg.alt = name;
  sectionPlace.prepend(cardsElement);
  const removeButton = cardsElement.querySelector(".places__icon-basket");
  removeButton.addEventListener("click", () => removeCard(cardsElement));
  cardsElement.querySelector('.places__icon-like').addEventListener('click', function (event) {
    event.target.classList.toggle('places__icon-like_active');
  });

  imgWrapper.addEventListener('click', function (event) {
    const currentCard = event.target;
    const name = currentCard.alt;
    const link = currentCard.src;
    popupImg.setAttribute('src', link);
    popupFullImgCaption.setAttribute('alt', name);
    popupFullImgCaption.textContent = name;
    popupFullImage.classList.add(POPUP_OPENED_CLASS);
  });
}

function initSections() {
  initialCards.forEach(element => {
    createCard(element.name, element.link);
  });
}

function openPopup() {
  popup.classList.add(POPUP_OPENED_CLASS);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function openPopupPlace() {
  popupPlace.classList.add(POPUP_OPENED_CLASS);

}

function popupSubmitHandler(evt) {
  evt.preventDefault(evt);
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  if (form.contains(evt.target)) {
    popup.classList.remove(POPUP_OPENED_CLASS);
  }
}

// submit cards
const handleSubmitCard = (event) => {
  event.preventDefault();
  const newCardTitle = inputCardTitle.value;
  const newCardLink = inputLinkCard.value;
  createCard(newCardTitle, newCardLink);
  const popup = event.target.closest('.popup');
  resetForm();
  closePopup(popup);

}

//delete cards
const removeCard = (element) => {
  element.remove()
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupCloseBtn.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function resetForm() {
  inputCardTitle.value = "";
  inputLinkCard.value = "";
}

popupBtnEdit.addEventListener("click", openPopup);
popupBtnAdd.addEventListener("click", openPopupPlace);
form.addEventListener('submit', popupSubmitHandler);
formCard.addEventListener("submit", handleSubmitCard);
initSections();
