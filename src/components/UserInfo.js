export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._name,
      description: this._description
    }
  }

  setUserInfo(inputData) {
    this._name.textContent = inputData.name;
    this._description.textContent = inputData.description;
  }
}
