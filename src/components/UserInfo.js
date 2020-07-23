export class UserInfo {
  constructor(nameSelector, bioSelector, avatarSelector, api) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._api = api;
  }

  getInitialUserInfo() {
    this.getUserInfo()
    .then(() => this.setUserInfo(this._userInfo.name, this._userInfo.bio));
  }

  getUserInfo() {
    // this._userInfo = {
    //   name: this._name.textContent,
    //   bio: this._bio.textContent
    // }
    return this._api.getUserInfo()
    .then(res => {
      this._userInfo = {
        name: res.name,
        bio: res.about,
        avatar: res.avatar,
        id: res._id
      }
      console.log(this._userInfo);
    })   
  }

  setUserInfo(name, bio) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}