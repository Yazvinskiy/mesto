const MODAL_ACTIVE_CLASS = "modal_active";

const openModalBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const modalConteiner = modal.querySelector(".modal__conteiner");
const modalCloseBtn = modal.querySelector(".modal__btn-close");
const form = document.querySelector(".modal__form");
const inputName = document.querySelector(".modal__input_name");
const inputProfession = document.querySelector(".modal__input_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");

openModalBtn.addEventListener("click", function () {
    modal.classList.add(MODAL_ACTIVE_CLASS);
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
});

const handleModalClick = (event) => {
    if (!modalConteiner.contains(event.target) || event.target === modalCloseBtn) {
        modal.classList.remove(MODAL_ACTIVE_CLASS);
    }
}

modal.addEventListener('click', handleModalClick);

 function handleModalSubmit(){
    
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
}
