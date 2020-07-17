import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {
  bioForm, 
  photoForm, 
  bioPopupSelector,
  photoPopupSelector,
  cardPopupSelector,
  editProfile,
  addPhoto,
  profileNameSelector,
  profileBioSelector,
  inputName,
  inputBio,
  inputTitle,
  inputLink,
  cardContainerSelector,
  cardTemplate,
  validateOptions,
  initialCards
} from '../utils/constants.js';

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


// button listeners

editProfile.addEventListener('click', () => {
  //userInfo.getUserInfo();
  inputName.value = userInfo._userInfo.name;
  inputBio.value = userInfo._userInfo.bio;
  bioPopup.open();
});

addPhoto.addEventListener('click', () => {
  inputTitle.value = '';
  inputLink.value = '';
  const button = photoForm.querySelector('.popup__save');
  button.classList.add('popup__save_disabled');
  button.disabled = true;
  cardPopup.open();
});


// validation

const validationBio = new FormValidator(validateOptions, bioForm);
validationBio.enableValidation();
const validationPhoto = new FormValidator(validateOptions, photoForm);
validationPhoto.enableValidation();
