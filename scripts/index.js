const popupEdit = document.querySelector('.popup_type_edit');
const popupFormEdit = document.querySelector('.popup__form_type_edit')
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popupCloseEdit = document.querySelector('.popup__close-button_type_edit');

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupAdd = document.querySelector('.popup_type_add');
const popupFormAdd = document.querySelector('.popup__form_type_add');
const popupOpenAdd = document.querySelector('.profile__add-button');
const popupCloseAdd = document.querySelector('.popup__close-button_type_add');

const buttonAdd = document.querySelector('.popup__submit-button_type_add');
const inputTitle = document.querySelector('#element-title');
const inputLink = document.querySelector('#element-link');
const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template');
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

const popupOpenImage = document.querySelector('.popup_type_image');
const popupCloseImage = document.querySelector('.popup__close-button_type_image');

const popupPhoto = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

//Функция открытия всплывающего окна редактирования профиля
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

//Функция закрытия всплывающего окна редактирования профиля
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

//Функция отправки формы редактирования профиля
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopupEdit();
}

popupOpenEdit.addEventListener('click', openPopupEdit);
popupCloseEdit.addEventListener('click', closePopupEdit);
popupFormEdit.addEventListener('submit', formSubmitHandlerEdit);

function createElement(item) {
  const newElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  const elementTitle = newElement.querySelector('.element__title');
  const elementLink = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like-button');
  const deleteButton = newElement.querySelector('.element__delete-button');

  elementTitle.textContent = item.name;
  elementLink.src = item.link;

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  elementLink.addEventListener('click', function() {
    popupPhoto.src = item.link;
    popupFigcaption.textContent = item.name;

    openPopupImage();
  });

  return newElement;
}

initialElements.forEach(function(currentItem) {
  const newItem = createElement(currentItem);
  elementsContainer.append(newItem);
});

//Функция открытия всплывающего окна добавления карточек
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

//Функция закрытия всплывающего окна добавления карточек
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

//Функция отправки формы добавления карточек
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();

  const oneMoreItem = {
    name: inputTitle.value,
    link: inputLink.value
  };
  inputTitle.value = '';
  inputLink.value = '';

  elementsContainer.prepend(createElement(oneMoreItem));

  closePopupAdd();
}

popupOpenAdd.addEventListener('click', openPopupAdd);
popupCloseAdd.addEventListener('click', closePopupAdd);
popupFormAdd.addEventListener('submit', formSubmitHandlerAdd);

//Функция открытия просмотра фотографии
function openPopupImage() {
  popupOpenImage.classList.add('popup_opened');
}

//Функция закрытия просмотра фотографии
function closePopupImage() {
  popupOpenImage.classList.remove('popup_opened');
}

popupCloseImage.addEventListener('click', closePopupImage);
