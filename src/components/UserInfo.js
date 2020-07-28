export class UserInfo {
  constructor(nameSelector, bioSelector, avatarSelector, api) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._api = api;
  }

  getInitialUserInfo() {
    this.getUserInfo()
    .then(() => this.setUserInfo(this._userInfo.name, this._userInfo.bio, this._userInfo.avatar));
  }

  getUserInfo() {
    return this._api.getUserInfo()
    .then(res => {
      this._userInfo = {
        name: res.name,
        bio: res.about,
        avatar: res.avatar,
        id: res._id
      }
    })   
  }

  setUserInfo(name, bio, avatar) {
    if (name) this._name.textContent = name;
    if (bio) this._bio.textContent = bio;
    if (avatar) this._avatar.src = avatar;
  }
}