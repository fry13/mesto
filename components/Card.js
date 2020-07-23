export class Card {
  constructor({name, link, likes, owner, _id}, template, handleCardClick, api, myId) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._owner = owner;
    this._api = api;
    this.id = _id;
    this._myId = myId;
  }

  getCard() {    
    this._former = this._template.cloneNode(true);
    this._photo = this._former.querySelector('.elements__photo');
    this._title = this._former.querySelector('.elements__title');
    this._like = this._former.querySelector('.elements__like');
    this._counter = this._former.querySelector('.elements__counter');
    this._bin = this._former.querySelector('.elements__trash-bin');
    this._title.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    if (this._likes) {
      this._counter.textContent = this._likes.length;
      this._likes.forEach((item) => {
        if (item._id === this._myId) {
          this._like.classList.add('elements__like_active')
        }
      })
    }
    this._addEventListners();
    if (this._owner._id !== this._myId) {
      this._bin.remove();
    }
    return this._former;
  }
 
  _addEventListners() {
    this._like.addEventListener('click', () => this._toggleLike());
    this._bin.addEventListener('click', () => this._remove());
    this._photo.addEventListener('click', () => this._handleCardClick(this._name, this._link)); ///////////
  }
 
  _isCardLiked() {    
    return this._likes.some(like => like._id === this.currentUserId);
  }

  _toggleLike() {
    this._like.classList.contains('elements__like_active') ? (
      this._api.dislikeCard(this.id)
        .then(() => {
          this._like.classList.remove('elements__like_active');
          this._counter.textContent = +this._counter.textContent - 1;
        })
    ) : (
      this._api.likeCard(this.id)
        .then(() => {
          this._like.classList.add('elements__like_active');
          this._counter.textContent = +this._counter.textContent + 1;
        })
    )
  }

  _remove() {
    this._api.deleteCard(this.id)
    .then(this._bin.parentElement.remove());
  }
}

