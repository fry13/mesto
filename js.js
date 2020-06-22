const popupBio = document.querySelector('.popup_type_edit-bio');
const popupCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_max-photo');
const popupList = Array.from(document.querySelectorAll('.popup'));

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

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// создание фотокарточки

function createCard (cardTitle, cardLink) {              
  const newCard = cardTemplate.cloneNode(true);                                                                 // клонируем шаблон
   
  newCard.querySelector('.elements__title').textContent = cardTitle;                                            // берем имя из аргумента
  newCard.querySelector('.elements__photo').src = cardLink;                                                     // фото из аргумента
  newCard.querySelector('.elements__photo').alt = cardTitle;                                                    // alt из имени
  
  addEventListeners(newCard);
  return newCard;                                                                                               // возвращаем готовую карточку
};

// добавление слушателей на карточку

function addEventListeners (card) {
  const like = card.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));                         // слушатель на лайки
  
  const bin = card.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());                                              // слушатель на удаление

  const photo = card.querySelector('.elements__photo');
  photo.addEventListener('click', (evt) => {
    maxPhoto.src = evt.target.src;                                                                             // берем адрес и alt из таргета
    maxPhoto.alt = evt.target.alt;
    maxPhotoTitle.textContent = evt.target.alt;
    openPopup(popupPhoto)
  });
}

// открытие

function openPopup (popup) { 
  popup.addEventListener('mousedown', missсlick);
  document.addEventListener('keyup', escHandler);  
  popup.classList.add('popup_visibility_visible'); 
}

// закрытие

function closePopup() {  
  const popup = popupList.find(popup => popup.classList.contains('popup_visibility_visible'));
  popup.removeEventListener('mousedown', missсlick);
  document.removeEventListener('keyup', escHandler);  
  popup.classList.remove('popup_visibility_visible');
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  const errorList = Array.from(popup.querySelectorAll('.popup__error'));
  inputList.forEach((input) => {input.classList.remove('popup__input_error')});
  errorList.forEach((error) => {error.textContent = ''});
}

// закрытие по Esc

function escHandler(evt) {      
  if (evt.key === 'Escape') {
    closePopup();
  }
};

// закрытие по клику мимо попапа

function missсlick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container')) {
    evt.stopImmediatePropagation();
    closePopup();
  }  
}

// закрытие по крестику

Array.from(document.querySelectorAll('.popup__exit')).forEach(function closePopupThroughCross (item) {
  item.addEventListener('click', () => {
    closePopup();
  })
});

// стандартные карточки

initialCards.forEach( (card) => {
  cardContainer.append(createCard(card.name, card.link));
});

// слушатели кнопок

editProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;                                                                    // заполняем инпуты из био
  inputBio.value = profileBio.textContent;
  openPopup(popupBio);  
});

addPhoto.addEventListener('click', () => {
  inputTitle.value = '';                                                                                        // очищаем инпуты
  inputLink.value = '';
  openPopup(popupCard);
});

bioForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup();
});

photoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardContainer.prepend(createCard(inputTitle.value, inputLink.value));
  closePopup();
})