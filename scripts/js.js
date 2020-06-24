const popupBio = document.querySelector('.popup_type_edit-bio');
const popupCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_max-photo');

const bioForm = document.forms.bio;
const photoForm = document.forms.addPhoto;

const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const maxPhoto = document.querySelector('.popup__photo');
const maxPhotoTitle = document.querySelector('.popup__photo-title');

const inputName = document.querySelector('.popup__input_name');
const inputBio = document.querySelector('.popup__input_bio');
const inputTitle = document.querySelector('.popup__input_title');
const inputLink = document.querySelector('.popup__input_link');

const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// создание фотокарточки

function createCard (cardTitle, cardLink) {
  const newCard = cardTemplate.cloneNode(true);
   
  newCard.querySelector('.elements__title').textContent = cardTitle;
  newCard.querySelector('.elements__photo').src = cardLink;
  newCard.querySelector('.elements__photo').alt = cardTitle;
  
  addEventListeners(newCard);
  return newCard;
};

// добавление слушателей на карточку

function addEventListeners (card) {
  const like = card.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));
  
  const bin = card.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());

  const photo = card.querySelector('.elements__photo');
  photo.addEventListener('click', (evt) => {
    maxPhoto.src = evt.target.src;
    maxPhoto.alt = evt.target.alt;
    maxPhotoTitle.textContent = evt.target.alt;
    openPopup(popupPhoto)
  });
}

function clearValidationErrors (form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const errorList = Array.from(form.querySelectorAll('.popup__error'));

  inputList.forEach((input) => {input.classList.remove('popup__input_error')});
  errorList.forEach((error) => {error.textContent = ''});
};

// открытие

function openPopup (popup) { 
  popup.addEventListener('mousedown', missсlick);
  document.addEventListener('keyup', escHandler);
  popup.classList.add('popup_visibility_visible');
  
}

// закрытие

function closePopup(popup) {  
  popup.removeEventListener('mousedown', missсlick);
  document.removeEventListener('keyup', escHandler);
  popup.classList.remove('popup_visibility_visible');  
}

// закрытие по Esc

function escHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_visibility_visible'));
  }
};

// закрытие по клику мимо попапа

function missсlick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container')) {
    evt.stopImmediatePropagation();
    closePopup(document.querySelector('.popup_visibility_visible'));
  }  
}

// закрытие по крестику

Array.from(document.querySelectorAll('.popup__exit'))
  .forEach(function closePopupThroughCross (item) {
    item.addEventListener('click', () => {
      closePopup(document.querySelector('.popup_visibility_visible'));
    })
  }
);

// стандартные карточки

initialCards.forEach( (card) => {
  cardContainer.append(createCard(card.name, card.link));
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
  cardContainer.prepend(createCard(inputTitle.value, inputLink.value));
  closePopup(document.querySelector('.popup_visibility_visible'));
})