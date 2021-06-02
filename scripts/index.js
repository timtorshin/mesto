import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEdit = document.querySelector('.popup_type_edit'); //Попап редактирования профиля
const popupFormEdit = document.querySelector('.popup__form_type_edit') //Форма редактирования профиля
const popupOpenEdit = document.querySelector('.profile__edit-button'); //Кнопка открытия редактирования профиля
const popupCloseEdit = document.querySelector('.popup__close-button_type_edit'); //Кнопка закрытия редактирования профиля

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupAdd = document.querySelector('.popup_type_add'); //Попап добавления карточек
const popupFormAdd = document.querySelector('.popup__form_type_add'); //Форма добавления карточек
const popupOpenAdd = document.querySelector('.profile__add-button'); //Кнопка открытия добавления карточек
const popupCloseAdd = document.querySelector('.popup__close-button_type_add'); //Кнопка закрытия добавления карточек

const inputTitle = document.querySelector('#element-title');
const inputLink = document.querySelector('#element-link');

const elementsContainer = document.querySelector('.elements');

const popupOpenImage = document.querySelector('.popup_type_image'); //Попап просмотра фотографии
const popupCloseImage = document.querySelector('.popup__close-button_type_image'); //Кнопка закрытия просмотра фотографии

const initialElements = [
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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
}

const formValidEdit = new FormValidator(config, popupFormEdit);
formValidEdit.enableValidation();

const formValidAdd = new FormValidator(config, popupFormAdd);
formValidAdd.enableValidation();

//Функция открытия всплывающего окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', handleOverlayClick);
  document.addEventListener('keydown', closeOnEscape);
}

//Функция закрытия всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', handleOverlayClick);
  document.removeEventListener('keydown', closeOnEscape);
}

//Функция закрытия всплывающего окна при нажатии за его пределами
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция закрытия всплывающего окна при нажатии на esc
function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Открытие окна редактирования профиля
popupOpenEdit.addEventListener('click', function() {
  openPopup(popupEdit);

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  formValidEdit.toggleButtonState();
  formValidEdit.clearErrors();
});

//Закрытие окна редактирования профиля
popupCloseEdit.addEventListener('click', function() {
  closePopup(popupEdit);
});

//Функция отправки формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupEdit);
}

//Отправка формы редактирования профиля 
popupFormEdit.addEventListener('submit', handleEditFormSubmit);

//Открытие окна добавления карточек
popupOpenAdd.addEventListener('click', function() {
  openPopup(popupAdd);

  popupFormAdd.reset();

  formValidAdd.toggleButtonState();
  formValidAdd.clearErrors();
});

//Закрытие окна добавления карточек
popupCloseAdd.addEventListener('click', function() {
  closePopup(popupAdd);
});

//Функция отправки формы добавления карточек
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const oneMoreItem = {
    name: inputTitle.value,
    link: inputLink.value
  };

  popupFormAdd.reset();
  
  elementsContainer.prepend(createElement(oneMoreItem.name, oneMoreItem.link, '#element-template', openPopup));

  closePopup(popupAdd);
}

//Отправка формы добавления карточек
popupFormAdd.addEventListener('submit', handleAddFormSubmit);

//Закрытие просмотра фотографии
popupCloseImage.addEventListener('click', function() {
  closePopup(popupOpenImage);
});

function createElement(name, link, template, openPopup) {
  const element = new Card(name, link, template, openPopup);
  return element.generateCard();
}

initialElements.forEach((currentItem) => {
  elementsContainer.append(createElement(currentItem.name, currentItem.link, '#element-template', openPopup));
});
