import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-cards.js';
import {openPopup, closePopup} from './utils.js';

const popupBio = document.querySelector('.popup_type_edit-bio');
const popupCard = document.querySelector('.popup_type_add-card');

const bioForm = document.forms.bio;
const photoForm = document.forms.addPhoto;

const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const inputName = document.querySelector('.popup__input_name');
const inputBio = document.querySelector('.popup__input_bio');
const inputTitle = document.querySelector('.popup__input_title');
const inputLink = document.querySelector('.popup__input_link');

const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// очищение ошибок

function clearValidationErrors (form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const errorList = Array.from(form.querySelectorAll('.popup__error'));
  inputList.forEach((input) => {input.classList.remove('popup__input_error')});
  errorList.forEach((error) => {error.textContent = ''});
};

// закрытие по крестику

Array.from(document.querySelectorAll('.popup__exit'))
  .forEach(function closePopupThroughCross (item) {
    item.addEventListener('click', () => {
      closePopup(document.querySelector('.popup_visibility_visible'));
    })
  }
);

// стандартные карточки

initialCards.forEach( (item) => {
  const cardElement = new Card(item, cardTemplate);
  cardContainer.append(cardElement.getCard());
});

// слушатели кнопок

editProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  clearValidationErrors(document.forms.bio);
  openPopup(popupBio);
});

addPhoto.addEventListener('click', () => {
  inputTitle.value = '';
  inputLink.value = '';
  const button = photoForm.querySelector('.popup__save');
  button.classList.add('popup__save_disabled');
  button.disabled = true;
  clearValidationErrors(document.forms.addPhoto);
  openPopup(popupCard);
});

bioForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup(document.querySelector('.popup_visibility_visible'));
});

photoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = {
    name: inputTitle.value,
    link: inputLink.value
  }
  const cardElement = new Card(data, cardTemplate);  
  cardContainer.prepend(cardElement.getCard());
  closePopup(document.querySelector('.popup_visibility_visible'));
})

const validateOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

const validationBio = new FormValidator(validateOptions, bioForm);
validationBio.enableValidation();
const validationPhoto = new FormValidator(validateOptions, photoForm);
validationPhoto.enableValidation();