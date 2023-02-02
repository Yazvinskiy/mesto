export default class UserInfo {
  constructor(userNameSelector, userinfoSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userinfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._profileDate = {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    };

    return this._profileDate;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this._userAvatar.src = userData.avatar;
  }
}
