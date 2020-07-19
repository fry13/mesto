export class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent
    }
    return this._userInfo;
  }

  setUserInfo(name, bio) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}