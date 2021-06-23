import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(item) {
    super.open();

    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupFigcaption = this._popupElement.querySelector('.popup__figcaption');

    this._popupImage.src = item.link;
    this._popupImage.alt = 'Фотография ' + item.name;
    this._popupFigcaption.textContent = item.name;
  }
}
