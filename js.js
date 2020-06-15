const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__exit');
const bioForm = document.forms.bio;
const photoForm = document.forms.addPhoto;

const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');

const name = document.querySelector('.profile__name');
const bio = document.querySelector('.profile__bio');

const formContainer = document.querySelector('.popup__form-with-cross_for-form');
const photoContainer = document.querySelector('.popup__form-with-cross_for-photo');

const maxPhoto = document.querySelector('.popup__photo');
const maxPhotoTitle = document.querySelector('.popup__photo-title');

const inputName = document.querySelector('.popup__input_name');
const inputBio = document.querySelector('.popup__input_bio');
const inputTitle = document.querySelector('.popup__input_title');
const inputLink = document.querySelector('.popup__input_link');

const cardContainer = document.querySelector('.elements');
let card = document.querySelector('.elements__card');
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
  inputName.value = name.textContent;                                                                           // заполняем инпуты из био
  inputBio.value = bio.textContent;
  popup.classList.add('popup_visible');                                                                         // показываем попап
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
}

// создание фотокарточки

function cardCreate (cardTitle, cardLink) {              
  const newCard = cardTemplate.cloneNode(true);                                                                 // клонируем шаблон
  
  const like = newCard.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));                         // слушатель на лайки
  
  const bin = newCard.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());                                              // слушатель на удаление

  const photo = newCard.querySelector('.elements__photo');
  photo.addEventListener('click', popupPhoto);                                                                  // слушатель для увеличения фото
 
  newCard.querySelector('.elements__title').textContent = cardTitle;                                            // берем имя из аргумента
  newCard.querySelector('.elements__photo').src = cardLink;                                                     // фото из аргумента
  newCard.querySelector('.elements__photo').alt = cardTitle;                                                    // alt из имени

  return newCard;                                                                                               // возвращаем готовую карточку
};


// стандартные карточки

initialCards.forEach( (i) => {
  cardContainer.append(cardCreate(i.name, i.link));
});

// слушатели кнопок

editProfile.addEventListener('click', popupEdit);
addPhoto.addEventListener('click', popupAdd);

bioForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  name.textContent = inputName.value;
  bio.textContent = inputBio.value;
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

popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    evt.stopImmediatePropagation();
    popup.classList.remove('popup_visible');
  }  
});

// закрытие по Esc

document.addEventListener('keyup', function(evt) {
  if (evt.key === 'Escape') {
    popup.classList.remove('popup_visible');
  }
});