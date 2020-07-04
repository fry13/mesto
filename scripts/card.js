export {Card};
import {openPopup} from './index.js';

class Card {
  constructor(card, template) {
    this._name = card.name;
    this._link = card.link;
    this._template = template;
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
    const maxPhoto = document.querySelector('.popup__photo');
    const maxPhotoTitle = document.querySelector('.popup__photo-title');
    const popupPhoto = document.querySelector('.popup_type_max-photo');

    this._like.addEventListener('click', () => this._toggleLike());
    this._bin.addEventListener('click', () => this._remove());
    this._photo.addEventListener('click', (evt) => {
      maxPhoto.src = evt.target.src;
      maxPhoto.alt = evt.target.alt;
      maxPhotoTitle.textContent = evt.target.alt;
      openPopup(popupPhoto);
    });
  }

  _toggleLike() {
    this._like.classList.toggle('elements__like_active');
  }

  _remove() {
    this._bin.parentElement.remove();
  }
}