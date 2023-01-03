export default class UserInfo {

  constructor(nameSelector, infoSelector) {
    this._userName = nameSelector;
    this._userJob = infoSelector;
    
  }

  getUserInfo() {

    this._profileDate = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
    
    return this._profileDate;
       
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.job;
  }
}
