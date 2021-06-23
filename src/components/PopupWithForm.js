import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, formSubmit) {
    super({ popupSelector });
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this.form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form = this._popupElement.querySelector('.popup__form');
    this.form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  close() {
    super.close();
    this.form.reset();
  }
}
