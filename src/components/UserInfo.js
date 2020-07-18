export class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent
    } 
  }

  getUserInfo() {
    return this._userInfo;
  }

  setUserInfo(name, bio) {
    this._userInfo = {
      name: name,
      bio: bio
    } 
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}