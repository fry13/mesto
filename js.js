let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__button_edit');
let addPhoto = document.querySelector('.profile__button_add');
let name = document.querySelector('.profile__name');
let bio = document.querySelector('.profile__bio');
let inputName = document.querySelector('.popup__input_name');
let inputBio = document.querySelector('.popup__input_bio');
let popupClose = document.querySelector('.popup__exit');
let popupSave = document.querySelector('.popup__save');

function popupOpen() {  
  inputName.value = name.textContent;
  inputBio.value = bio.textContent;
  popup.classList.toggle('popup_visible');
}

function popupSubmit() {
  popup.classList.toggle('popup_visible');
  name.textContent = inputName.value;
  bio.textContent = inputBio.value;
}

function popupExit() {   
  popup.classList.toggle('popup_visible');   
}

editProfile.addEventListener('click', popupOpen);
popupClose.addEventListener('click', popupExit);
popupSave.addEventListener('click', popupSubmit);