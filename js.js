const popup = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__button_edit');
const addPhoto = document.querySelector('.profile__button_add');
const name = document.querySelector('.profile__name');
const bio = document.querySelector('.profile__bio');
const inputName = document.querySelector('.popup__input_name');
const inputBio = document.querySelector('.popup__input_bio');
const popupClose = document.querySelector('.popup__exit');
const form = document.querySelector('.popup__form-to-submit');

//открытие/закрытие

function popupToggle() {  
  inputName.value = name.textContent;
  inputBio.value = bio.textContent;
  popup.classList.toggle('popup_visible');
}

//отправка

function popupSubmit(evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_visible');
  name.textContent = inputName.value;
  bio.textContent = inputBio.value;
}

editProfile.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
form.addEventListener('submit', popupSubmit);