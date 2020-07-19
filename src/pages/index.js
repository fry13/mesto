import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {
  bioForm, 
  photoForm,
  editProfile,
  addPhoto,
  savePhoto,
  profileNameSelector,
  profileBioSelector,
  inputName,
  inputBio,
  cardContainerSelector,
  cardTemplate,
  validateOptions,
  initialCards
} from '../utils/constants.js';

const bioPopupSelector = '.popup_type_edit-bio'; 
const photoPopupSelector = '.popup_type_max-photo'; 
const cardPopupSelector = '.popup_type_add-card';


// user information

const userInfo = new UserInfo(profileNameSelector, profileBioSelector);


// biography popup

const bioPopup = new PopupWithForm(bioPopupSelector, ({name, bio}) => {userInfo.setUserInfo(name, bio)});
bioPopup.setEventListeners();


// image popup

export const imgPopup = new PopupWithImage(photoPopupSelector);
imgPopup.setEventListeners();


// new card popup

const cardPopup = new PopupWithForm(cardPopupSelector, (data)=> {
  const cardElement = new Card(data, cardTemplate, ()=> imgPopup.open(data.title, data.link));  
  cardsList.addItem(cardElement.getCard());
});
cardPopup.setEventListeners();


// initial cards

const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(data, cardTemplate, ()=> imgPopup.open(data.title, data.link));
      cardsList.addItem(cardElement.getCard());
    }
  },
  cardContainerSelector
);
cardsList.render();


// button handlers

function editProfileHandler() {
  validationBio.clearValidationErrors();
  inputName.value = userInfo.getUserInfo().name;
  inputBio.value = userInfo.getUserInfo().bio;
  bioPopup.open();
}

function addPhotoHandler() {
  validationPhoto.clearValidationErrors();
  savePhoto.classList.add('popup__save_disabled');
  savePhoto.disabled = true;
  cardPopup.open();
}

// button listeners

editProfile.addEventListener('click', editProfileHandler);
addPhoto.addEventListener('click', addPhotoHandler);


// validation

const validationBio = new FormValidator(validateOptions, bioForm);
validationBio.enableValidation();
const validationPhoto = new FormValidator(validateOptions, photoForm);
validationPhoto.enableValidation();
