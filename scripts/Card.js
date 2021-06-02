export default class Card {
  constructor(name, link, templateSelector, openImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openImage = openImage;

    this._createElements();
    this._setEventListeners();
  }

  _createElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._cardElement = cardTemplate.cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._elementLink = this._cardElement.querySelector('.element__image');
    this._elementTitle = this._cardElement.querySelector('.element__title');

    this._popupPhoto = document.querySelector('.popup__image');
    this._popupFigcaption = document.querySelector('.popup__figcaption');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handlePutLike());
    this._deleteButton.addEventListener('click', () => this._handleRemoveCard());
    this._elementLink.addEventListener('click', () => this._handleOpenPreview());
  }

  _handlePutLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleRemoveCard() {
    this._cardElement.remove();
  }

  _handleOpenPreview() {
    this._popupPhoto.src = this._link;
    this._popupPhoto.alt = 'Фотография ' + this._name;
    this._popupFigcaption.textContent = this._name;

    this._openImage(document.querySelector('.popup_type_image'));
  }

  generateCard() {
    this._elementLink.src = this._link;
    this._elementLink.alt = 'Фотография ' + this._name;
    this._elementTitle.textContent = this._name;

    return this._cardElement;
  }
}
