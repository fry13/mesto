import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._card = null;
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
      this.close();
    })
  }

  open(){
    super.open();
  }
}