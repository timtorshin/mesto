let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupOpenAct() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function popupCloseAct() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupCloseAct();
}

popupOpen.addEventListener('click', popupOpenAct);
popupClose.addEventListener('click', popupCloseAct);
popupForm.addEventListener('submit', formSubmitHandler);
