// forms
export const bioForm = document.forms.bio;
export const photoForm = document.forms.addPhoto;
// popups selectors
export const bioPopupSelector = '.popup_type_edit-bio';
export const photoPopupSelector = '.popup_type_max-photo';
export const cardPopupSelector = '.popup_type_add-card';
// buttons
export const editProfile = document.querySelector('.profile__button-edit');
export const addPhoto = document.querySelector('.profile__button-add');
// biography selectors
export const profileNameSelector = '.profile__name';
export const profileBioSelector = '.profile__bio';
// inputs
export const inputName = document.querySelector('.popup__input_name');
export const inputBio = document.querySelector('.popup__input_bio');
export const inputTitle = document.querySelector('.popup__input_title');
export const inputLink = document.querySelector('.popup__input_link');
// container, template
export const cardContainerSelector = '.elements';
export const cardTemplate = document.querySelector('#card-template').content;
// validation
export const validateOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}
// initial cards
export const initialCards = [
  {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
