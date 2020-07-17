import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  open(title, link) {
    this._popup.querySelector('.popup__photo').src = link;
    this._popup.querySelector('.popup__photo').alt = title;
    this._popup.querySelector('.popup__photo-title').textContent = title;
    super.open();
  }
}