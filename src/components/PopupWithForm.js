import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, showDefaultButton, showLoadingButton, formSubmit) {
    super({ popupSelector });
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this.form.querySelectorAll('.popup__input'));
    this._popupSubmitButton = this._popupElement.querySelector('.popup__submit-button');
    this.showDefaultButton = showDefaultButton;
    this._showLoadingButton = showLoadingButton;
    this.other = null;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setButtonCondition(text) {
    this._popupSubmitButton.textContent = text;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.setButtonCondition(this._showLoadingButton);
    this._formSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this.form = this._popupElement.querySelector('.popup__form');
    this.form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  close() {
    super.close();
    this.form.reset();
    this.setButtonCondition(this.showDefaultButton);
  }
}
