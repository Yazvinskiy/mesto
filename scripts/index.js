const POPUP_OPENED_CLASS = 'popup_opened';
const openPopupBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn = popup.querySelector(".popup__btn-close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_user_name");
const inputProfession = document.querySelector(".popup__input_user_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");

function openPopup() {
    popup.classList.add(POPUP_OPENED_CLASS);
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
};

function handlePopupClick(event) {
    if (!popupContainer.contains(event.target) || event.target === popupCloseBtn) {
        popup.classList.remove(POPUP_OPENED_CLASS);
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

openPopupBtn.addEventListener("click",openPopup);
popup.addEventListener('click', handlePopupClick);
form.addEventListener('submit', popupSubmitHandler); 