import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); 
    this._photo = this._popup.querySelector('.popup__photo');
    this._photoTitle = this._popup.querySelector('.popup__photo-title');    
  }

  open(title, link) {
    this._photo.src = link;
    this._photo.alt = title;
    this._photoTitle.textContent = title;
    super.open();
  }
}