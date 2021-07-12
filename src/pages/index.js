import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const popupFormEdit = document.querySelector('.popup__form_type_edit'); //Форма редактирования профиля
const popupFormAdd = document.querySelector('.popup__form_type_add'); //Форма добавления карточек
const popupFormAvatar = document.querySelector('.popup__form_type_avatar'); //Форма добавления аватара профиля

const popupOpenEdit = document.querySelector('.profile__edit-button'); //Кнопка открытия редактирования профиля
const popupOpenAdd = document.querySelector('.profile__add-button'); //Кнопка открытия добавления карточек
const popupOpenAvatar = document.querySelector('.profile__avatar-edit'); //Кнопка открытия добавления аватара профиля

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: 'b64fa093-d6bd-41e5-84d7-c528a8e6ffa0',
    'Content-Type': 'application/json'
  }
});

let myUserId = null;

function createCard(item) {
  const card = new Card(
    item,
    '#element-template',
    myUserId,
    () => api.putLike(card.id),
    () => api.deleteLike(card.id),
    () => popupImageOpen.open(item),
    (id, element) => {
      popupConfirm.other = { id, element };
      popupConfirm.open();
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const cardSection = new Section({
  renderer: (item) => cardSection.addInitialItem(createCard(item))
}, '.elements');

const popupAdd = new PopupWithForm(
  { popupSelector: '.popup_type_add' },
  "Создать",
  "Создание...",
  (inputData) => {
    api.addNewCard(inputData)
      .then((result) => {
        cardSection.addItem(result);
        popupAdd.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const popupEdit = new PopupWithForm(
  { popupSelector: '.popup_type_edit' },
  "Сохранить",
  "Сохранение...",
  (inputData) => {
    api.editProfileInfo(inputData)
      .then((result) => {
        profileInfo.setUserInfo(result);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const popupImageOpen = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

const profileInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
});

const {
  name: userCurrentName,
  description: userCurrentDescription,
  avatar: userCurrentAvatar,
} = profileInfo.getUserInfo();

const popupAvatar = new PopupWithForm(
  { popupSelector: '.popup_type_avatar' },
  "Сохранить",
  "Сохранение...",
  (inputData) => {
    api.updateAvatar(inputData)
      .then((result) => {
        avatar.src = result.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const popupConfirm = new PopupWithForm(
  { popupSelector: '.popup_type_confirm' },
  "Да",
  "Удаление...",
  () => {
    api.removeCard(popupConfirm.other.id)
      .then(() => {
        popupConfirm.other.element.remove();
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const formValidEdit = new FormValidator(config, popupFormEdit);
formValidEdit.enableValidation();

const formValidAdd = new FormValidator(config, popupFormAdd);
formValidAdd.enableValidation();

const formValidAvatar = new FormValidator(config, popupFormAvatar);
formValidAvatar.enableValidation();

popupOpenEdit.addEventListener('click', () => {
  popupEdit.open();
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

popupOpenAvatar.addEventListener('click', () => {
  popupAvatar.open();
  formValidAvatar.toggleButtonState();
  formValidAvatar.clearErrors();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userdata, cards]) => {
    userCurrentName.textContent = userdata.name;
    userCurrentDescription.textContent = userdata.about;
    userCurrentAvatar.src = userdata.avatar;
    myUserId = userdata;
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  }
);
