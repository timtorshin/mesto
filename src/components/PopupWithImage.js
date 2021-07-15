import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupFigcaption = this._popupElement.querySelector('.popup__figcaption');
  }

  open(item) {
    super.open();

    this._popupImage.src = item.link;
    this._popupImage.alt = 'Фотография ' + item.name;
    this._popupFigcaption.textContent = item.name;
  }
}
