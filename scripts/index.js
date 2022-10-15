
  
const placesSection = document.querySelector(".places");

const POPUP_OPENED_CLASS = 'popup_opened';
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector(".popup__place");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn = popup.querySelector(".popup__btn-close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_user_name");
const inputProfession = document.querySelector(".popup__input_user_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");

// не отоброжается контент(из темплейт)
function createCard(name, link) {
  const cardsTemplate = document.querySelector('#template-cards').content;
  const cardsElement = cardsTemplate.querySelector('.places__card').cloneNode(true);
  const cardsElementImg = cardsTemplate.querySelector('.places__image');
  cardsElement.querySelector('.places__title').textContent = name;
  cardsElementImg.querySelector('.places__image').src = link;
  cardsElementImg.alt = name;
  placesSection.append(createCard);
  
};


function openPopup() {
  popup.classList.add(POPUP_OPENED_CLASS);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
};

function openPopupPlace() {
  popupPlace.classList.add(POPUP_OPENED_CLASS);

};

function handlePopupClick(event) {
  if (!popupContainer.contains(event.target) || event.target === popupCloseBtn) {
    popup.classList.remove(POPUP_OPENED_CLASS) || popupPlace.classList.remove(POPUP_OPENED_CLASS);
  }
};

function popupSubmitHandler(evt) {
  evt.preventDefault(evt);
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  if (form.contains(evt.target)) {
    popup.classList.remove(POPUP_OPENED_CLASS);
  }
};







popupBtnEdit.addEventListener("click", openPopup);
popupBtnAdd.addEventListener("click", openPopupPlace);
popup.addEventListener('click', handlePopupClick);
popupPlace.addEventListener('click', handlePopupClick);
form.addEventListener('submit', popupSubmitHandler); 


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