import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupFormEdit = document.querySelector('.popup__form_type_edit') //Форма редактирования профиля
const popupFormAdd = document.querySelector('.popup__form_type_add'); //Форма добавления карточек

const popupOpenEdit = document.querySelector('.profile__edit-button'); //Кнопка открытия редактирования профиля
const popupOpenAdd = document.querySelector('.profile__add-button'); //Кнопка открытия добавления карточек

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

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

const popupImageOpen = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

function createCard(item) {
  const card = new Card(item, '#element-template', () => {
    popupImageOpen.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardSection = new Section({
  items: initialElements,
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, '.elements');
cardSection.renderItems();

const profileInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit'
}, inputData => profileInfo.setUserInfo(inputData));

const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add'
}, item => cardSection.addItem(createCard(item)));

popupOpenEdit.addEventListener('click', () => {
  popupEdit.open();
  const {
    name: userCurrentName,
    description: userCurrentDescription
  } = profileInfo.getUserInfo();
  inputName.value = userCurrentName.textContent;
  inputDescription.value = userCurrentDescription.textContent;
  formValidEdit.toggleButtonState();
  formValidEdit.clearErrors();
});

popupOpenAdd.addEventListener('click', () => {
  popupAdd.open();
  formValidAdd.toggleButtonState();
  formValidAdd.clearErrors();
});
