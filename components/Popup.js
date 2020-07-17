export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._cross = this._popup.querySelector('.popup__exit');
  }

  open() {
    this._popup.classList.add('popup_visibility_visible');  
  }

  close() {
    this._popup.removeEventListener('mousedown', () => {this._handleMissсlick()});
    document.removeEventListener('keyup', () => {this._handleEscClose()});
    this._popup.classList.remove('popup_visibility_visible'); 
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMissсlick(evt) {
    if ((evt.target === this._popup) || (evt.target === this._popup.querySelector('.popup__container'))) {    
      this.close(); 
    }  
  }

  setEventListeners() {
    this._cross.addEventListener('click', () => {this.close()});
    this._popup.addEventListener('mousedown', (evt) => {this._handleMissсlick(evt)});    
    document.addEventListener('keyup', (evt)=> {this._handleEscClose(evt)});
  }
}