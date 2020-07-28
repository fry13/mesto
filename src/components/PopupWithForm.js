import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');    
    this._formButton = this._popup.querySelector('.popup__save');
  }

  _getInputValues() {
    this._inputValues = {};
    this._popup.querySelectorAll('.popup__input').forEach((item) => {this._inputValues[item.name] = item.value});
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {   
      evt.preventDefault();         
      this._formButton.textContent = 'Сохранение...';
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset();    
  }

  open() {
    super.open();
    this._formButton.textContent = 'Сохранить';
  }

}