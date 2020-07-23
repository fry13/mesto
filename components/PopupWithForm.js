import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
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
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }

  // _clearValidationErrors() {
  //   const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  //   const errorList = Array.from(this._form.querySelectorAll('.popup__error'));
  //   inputList.forEach((input) => {input.classList.remove('popup__input_error')});
  //   errorList.forEach((error) => {error.textContent = ''});
  // };

  // open() {
  //   //this._clearValidationErrors();
  //   super.open();    
  // }

  close() {
    super.close();
    this._form.reset();    
  }

}