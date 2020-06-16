const popup = document.querySelector('.popup');
const bioForm = document.forms.bio;
const photoForm = document.forms.addPhoto;

const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const formContainer = document.querySelector('.popup__form-with-cross_for-form');
const photoContainer = document.querySelector('.popup__form-with-cross_for-photo');

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

// форма редактирования био

function popupEdit() {
  formContainer.classList.remove('popup__form-with-cross_hidden');                                              // показываем контейнер формы
  photoContainer.classList.add('popup__form-with-cross_hidden');                                                // cкрываем контейнер фото
  popup.classList.remove('popup_for-photo');                                                                    // уменьшаем затенение оверлея
  bioForm.classList.remove('popup__form_hidden');                                                               // прячем форму добавления фотокарточек.
  photoForm.classList.add('popup__form_hidden');                                                                // показываем форму для редактирования биографии
  inputName.value = profileName.textContent;                                                                           // заполняем инпуты из био
  inputBio.value = profileBio.textContent;        
  popup.classList.add('popup_visible');                                                                         // показываем попап
  toggleButtonState(Array.from(bioForm.querySelectorAll('.popup__input')), bioForm.querySelector('.popup__save'));
  escHandler();
}

// просмотр фото

function popupPhoto(button) {
  formContainer.classList.add('popup__form-with-cross_hidden');                                                 // скрываем контейнер формы
  photoContainer.classList.remove('popup__form-with-cross_hidden');                                             // показываем контейнер фото
  popup.classList.add('popup_for-photo');                                                                       // увеличиваем затенение оверлея
  maxPhoto.src = button.target.src;                                                                             // берем адрес и alt из таргета
  maxPhoto.alt = button.target.alt;
  maxPhotoTitle.textContent = button.target.alt;                                                                // подписываем фото                                     
  popup.classList.add('popup_visible');                                                                         // показываем попап
  escHandler();
}

// форма добавления фотокарточки

function popupAdd() {
  formContainer.classList.remove('popup__form-with-cross_hidden');                                              // показываем контейнер формы
  photoContainer.classList.add('popup__form-with-cross_hidden');                                                // cкрываем контейнер фото
  popup.classList.remove('popup_for-photo');                                                                    // уменьшаем затенение оверлея
  photoForm.classList.remove('popup__form_hidden');                                                             // прячем форму редактирования биографии.
  bioForm.classList.add('popup__form_hidden');                                                                  // показываем форму для добавления карточек.
  inputTitle.value = '';                                                                                        // очищаем инпуты
  inputLink.value = '';
  popup.classList.add('popup_visible');                                                                         // показываем попап
  escHandler();
}

// создание фотокарточки

function cardCreate (cardTitle, cardLink) {              
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
  photo.addEventListener('click', popupPhoto);                                                                  // слушатель для увеличения фото
}

// закрытие по Esc

function escHandler() {  
    document.addEventListener('keyup', function escPress(evt){
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_visible');
      document.removeEventListener('keyup', escPress);
    }
  });
}

// стандартные карточки

initialCards.forEach( (card) => {
  cardContainer.append(cardCreate(card.name, card.link));
});

// слушатели кнопок

editProfile.addEventListener('click', popupEdit);
addPhoto.addEventListener('click', popupAdd);

bioForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  popup.classList.remove('popup_visible');
});

photoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardContainer.prepend(cardCreate(inputTitle.value, inputLink.value));
  popup.classList.remove('popup_visible');
})

// закрытие по крестику

Array.from(document.querySelectorAll('.popup__exit')).forEach( (item) => {
  item.addEventListener('click', () => {popup.classList.remove('popup_visible')})
});

// закрытие по клику мимо попапа

popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__form-with-cross')) {
    evt.stopImmediatePropagation();
    popup.classList.remove('popup_visible');
  }  
});

