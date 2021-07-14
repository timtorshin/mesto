export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name,
      description: this._description,
      avatar: this._avatar
    }
  }

  setUserInfo(inputData) {
    this._name.textContent = inputData.name;
    this._description.textContent = inputData.about;
  }

  setUserAvatar(inputData) {
    this._avatar.src = inputData.avatar;
  }
}
