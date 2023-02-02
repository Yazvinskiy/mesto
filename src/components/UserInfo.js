export default class UserInfo {
  constructor(userName, userinfo) {
    this._userName = userName;
    this._userJob = userinfo;
    this._userAvatar = document.querySelector(".profile__avatar");
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
