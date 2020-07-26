import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js'
import {
  bioForm, 
  photoForm,
  avatarForm,
  editProfile,
  setAvatar,
  addPhoto,
  savePhoto,
  profileNameSelector,
  profileBioSelector,
  profileAvatarselector,
  inputName,
  inputBio,
  cardContainerSelector,
  cardTemplate,
  validateOptions,
  identity
} from '../utils/constants.js';

const bioPopupSelector = '.popup_type_edit-bio'; 
const photoPopupSelector = '.popup_type_max-photo'; 
const cardPopupSelector = '.popup_type_add-card';
const avatarPopupSelector = '.popup_type_avatar';
const deleteCardPopupSelector = '.popup_type_delete-card';


// API

const api = new Api(identity);


// user information

const userInfo = new UserInfo(profileNameSelector, profileBioSelector, profileAvatarselector, api, identity.id);
userInfo.getInitialUserInfo();


// card creation

const generateCard = (card) => {  
  const cardElement = new Card(
    card, 
    cardTemplate, 
    ()=> imgPopup.open(card.name, card.link), 
    ()=> {
      deleteCardPopup.setSubmitHandler(()=>{
        cardElement.removeCard();
      })
      deleteCardPopup.open();
    }, 
    api, 
    identity.id
  );
  cardsList.addItem(cardElement.getCard());
}


// render cards

let cardsList = {};

function addCards() {
  api.getInitialCards().then(res => {
    cardsList = new Section({
      items: res,
      renderer: (card) => generateCard(card)
  },
  cardContainerSelector
  );
  cardsList.render();
  })
}
addCards();


// new card popup

function postCard(data) {
  api.createCard(data.name, data.link)
  .then(card => generateCard(card))
  .then(cardPopup.close())      
}

const cardPopup = new PopupWithForm(cardPopupSelector, (data) => {
  postCard(data)
});


// biography popup

const bioPopup = new PopupWithForm(bioPopupSelector, ({name, bio}) => {
  userInfo.setUserInfo(name, bio);
  api.setUserInfo(name, bio)
  .then(bioPopup.close());
});


// image popup

export const imgPopup = new PopupWithImage(photoPopupSelector);


// avatar popup

function newAvatar(data) {
  api.setAvatar(data)
  .then((res)=>{
    document.querySelector('.profile__avatar').src = res.avatar;
    avatarPopup.close();
  })
}

const avatarPopup = new PopupWithForm(avatarPopupSelector, (link) => {
  newAvatar(link);
});


// delete card popup

const deleteCardPopup = new PopupWithConfirm(deleteCardPopupSelector);


// button handlers

function editProfileHandler() {
  validationBio.clearValidationErrors();  
  inputName.value = document.querySelector(profileNameSelector).textContent;
  inputBio.value = document.querySelector(profileBioSelector).textContent;;
  bioPopup.open();   
}

function addPhotoHandler() {
  validationPhoto.clearValidationErrors();
  savePhoto.classList.add('popup__save_disabled');
  savePhoto.disabled = true;
  cardPopup.open();
}

function setAvatarHandler() {
  avatarPopup.open();
}


// button listeners

editProfile.addEventListener('click', editProfileHandler);
addPhoto.addEventListener('click', addPhotoHandler);
setAvatar.addEventListener('click', setAvatarHandler)


// validation

const validationBio = new FormValidator(validateOptions, bioForm);
validationBio.enableValidation();
const validationPhoto = new FormValidator(validateOptions, photoForm);
validationPhoto.enableValidation();
const validationAvatar = new FormValidator(validateOptions, avatarForm);
validationAvatar.enableValidation();