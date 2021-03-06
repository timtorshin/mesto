export default class Card {
  constructor(data, templateSelector, idHolder, addLikeAction, removeLikeAction, handleCardClick, confirmAction) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this.id = data._id;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._idHolder = idHolder;
    this._addLike = addLikeAction;
    this._removeLike = removeLikeAction;
    this._confirm = confirmAction;
  }

  _getTemplate() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _createElements() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementLink = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
  }

  handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  setLikesInfo(likeAmount) {
    this._likeButton.classList.toggle('element__like-button_active');
    this._likeCounter.textContent = likeAmount;
  }

  _clickLike() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._removeLike();
    } else this._addLike();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._clickLike());
    this._deleteButton.addEventListener('click', () => this._confirm(this.id, this._element));
    this._elementLink.addEventListener('click', () => this._handleCardClick());
  }

  generateCard() {
    this._createElements();
    this._setEventListeners();

    this._elementLink.src = this._link;
    this._elementLink.alt = 'Фотография ' + this._name;
    this._elementTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes;

    if (this._data.owner._id !== this._idHolder._id) {
      this._deleteButton.remove();
    }
    if (this._data.likes.find((item) => item._id === this._idHolder._id)) {
      this._likeButton.classList.add('element__like-button_active');
    }

    return this._element;
  }
}
