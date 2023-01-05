export default class UserInfo {
  constructor(userName, userinfo) {
    this._userName = userName;
    this._userJob = userinfo;
  }

  getUserInfo() {
    this._profileDate = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };

    return this._profileDate;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.job;
  }
}
