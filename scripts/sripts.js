const MODAL_ACTIVE_CLASS = "modal_active";

const openModalBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const modalConteiner = modal.querySelector(".modal__conteiner");
const modalCloseBtn = modal.querySelector(".modal__btn-close");
const form = modal.querySelector(".modal__form");
const inputName = modal.querySelector(".modal__input_name");
const inputProfession = modal.querySelector(".modal__input_profession");

openModalBtn.addEventListener("click", (event) => {
    modal.classList.add(MODAL_ACTIVE_CLASS);
});

modal.addEventListener("click", (event) =>{
if(!modalConteiner.contains(event.target) || event.target === modalCloseBtn){
    modal.classList.remove(MODAL_ACTIVE_CLASS);
}
});

form.addEventListener("sudmit", (event) => {
    event.preventDefault();
   form.querySelector(".form__input_name");
   form.querySelector(".modal__input_profession");
});
