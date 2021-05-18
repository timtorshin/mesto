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

const inputTitle = document.querySelector('#element-title');
const inputLink = document.querySelector('#element-link');
const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template');

const popupOpenImage = document.querySelector('.popup_type_image');
const popupCloseImage = document.querySelector('.popup__close-button_type_image');

const popupPhoto = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

//Функция открытия всплывающего окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popupEdit.addEventListener('mousedown', handleOverlayClick);
  popupAdd.addEventListener('mousedown', handleOverlayClick);
  popupOpenImage.addEventListener('mousedown', handleOverlayClick);
  document.addEventListener('keydown', closeOnEscape);
}

//Функция закрытия всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popupEdit.removeEventListener('mousedown', handleOverlayClick);
  popupAdd.removeEventListener('mousedown', handleOverlayClick);
  popupOpenImage.removeEventListener('mousedown', handleOverlayClick);
  document.removeEventListener('keydown', closeOnEscape);
}

//Функция закрытия всплывающего окна при нажатии за его пределами
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

//Функция закрытия всплывающего окна при нажатии на esc
function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupEdit) || closePopup(popupAdd) || closePopup(popupOpenImage);
  }
}

//Открытие окна редактирования профиля
popupOpenEdit.addEventListener('click', function() {
  openPopup(popupEdit);

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
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
  inputTitle.value = '';
  inputLink.value = '';

  elementsContainer.prepend(createElement(oneMoreItem));

  closePopup(popupAdd);
}

//Отправка формы добавления карточек
popupFormAdd.addEventListener('submit', handleAddFormSubmit);

//Закрытие просмотра фотографии
popupCloseImage.addEventListener('click', function() {
  closePopup(popupOpenImage);
});

function createElement(item) {
  const newElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  const elementTitle = newElement.querySelector('.element__title');
  const elementLink = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like-button');
  const deleteButton = newElement.querySelector('.element__delete-button');

  elementTitle.textContent = item.name;
  elementLink.src = item.link;
  elementLink.alt = 'Фотография ' + item.name;

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  elementLink.addEventListener('click', function() {
    popupPhoto.src = item.link;
    popupPhoto.alt = 'Фотография ' + item.name;
    popupFigcaption.textContent = item.name;

    openPopup(popupOpenImage);
  });

  return newElement;
}

initialElements.forEach(function(currentItem) {
  const newItem = createElement(currentItem);
  elementsContainer.append(newItem);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
});
