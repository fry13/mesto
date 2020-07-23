//identity
export const identity = {
    token: '4f12e696-6331-47e4-913f-e0c0002ac61f',
    url: 'https://mesto.nomoreparties.co/v1/cohort-13',
    id: '13b75ba77788c0a719630101',
}
// forms
export const bioForm = document.forms.bio;
export const photoForm = document.forms.addPhoto;
// buttons
export const editProfile = document.querySelector('.profile__button-edit');
export const addPhoto = document.querySelector('.profile__button-add');
export const savePhoto = photoForm.querySelector('.popup__save');
// biography selectors
export const profileNameSelector = '.profile__name';
export const profileBioSelector = '.profile__bio';
export const profileAvatarselector = '.profile__avatar';
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
