export class Card {
  constructor(card, template, handleCardClick) {
    this._name = card.title;
    this._link = card.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  getCard() {
    this._former = this._template.cloneNode(true);
    this._photo = this._former.querySelector('.elements__photo');
    this._title = this._former.querySelector('.elements__title');
    this._like = this._former.querySelector('.elements__like');
    this._bin = this._former.querySelector('.elements__trash-bin');
    this._title.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._addEventListners();
    return this._former;
  }

 
  _addEventListners() {
    this._like.addEventListener('click', () => this._toggleLike());
    this._bin.addEventListener('click', () => this._remove());
    this._photo.addEventListener('click', () => this._handleCardClick(this._name, this._link)); ///////////
  }

  _toggleLike() {
    this._like.classList.toggle('elements__like_active');
  }

  _remove() {
    this._bin.parentElement.remove();
  }
}

