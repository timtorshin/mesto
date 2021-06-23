export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _createElements() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementLink = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
  }

  _handlePutLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleRemoveCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handlePutLike());
    this._deleteButton.addEventListener('click', () => this._handleRemoveCard());
    this._elementLink.addEventListener('click', () => this._handleCardClick());
  }

  generateCard() {
    this._createElements();
    this._setEventListeners();

    this._elementLink.src = this._link;
    this._elementLink.alt = 'Фотография ' + this._name;
    this._elementTitle.textContent = this._name;

    return this._element;
  }
}
