let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupOpenClose() {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupOpenClose();
}

popupOpen.addEventListener('click', popupOpenClose);
popupClose.addEventListener('click', popupOpenClose);
popup.addEventListener('submit', formSubmitHandler);
