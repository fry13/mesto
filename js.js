const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__exit');
const bioForm = document.forms.bio;
const photoForm = document.forms.addPhoto;

const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');

const name = document.querySelector('.profile__name');
const bio = document.querySelector('.profile__bio');

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



// редактирование био

function popupEdit(button) {
  document.querySelector('.popup__form-with-cross').classList.remove('popup__form-with-cross_for-photo'); // прячем из попапа фото.
  document.querySelector('.popup__photo').classList.remove('popup__photo_visible');                       //
  document.querySelector('.popup').classList.remove('popup_for-photo');                                   // 
  document.querySelector('.popup__photo-title').classList.remove('popup__photo-title_visible');           // убираем подпись под увеличенным фото.
  bioForm.classList.remove('popup__form_hidden');                                                         // прячем форму для добавления фотокарточек.
  photoForm.classList.add('popup__form_hidden');                                                          // показываем форму для редактирования биографии
  inputName.value = name.textContent;                                                                     // заполняем инпуты из био
  inputBio.value = bio.textContent;
  popup.classList.add('popup_visible');                                                                    // показываем попап
}

//добавление фотокарточки

function popupAdd(button) {
  document.querySelector('.popup__form-with-cross').classList.remove('popup__form-with-cross_for-photo');  // прячем из попапа фото.
  document.querySelector('.popup__photo').classList.remove('popup__photo_visible');                        // 
  document.querySelector('.popup').classList.remove('popup_for-photo');                                    // 
  document.querySelector('.popup__photo-title').classList.remove('popup__photo-title_visible');            // убираем подпись под увеличенным фото.
  photoForm.classList.remove('popup__form_hidden');                                                        // прячем форму для редактирования биографии.
  bioForm.classList.add('popup__form_hidden');                                                             // показываем форму для добавления карточек.
  inputTitle.value = '';                                                                                   // очищаем инпуты
  inputLink.value = '';
  popup.classList.add('popup_visible');                                                                    // показываем попап
}

//просмотр фото

function popupPhoto(button) {
  photoForm.classList.add('popup__form_hidden');                                                             // прячем формы редактирования био и добавления карточек.
  bioForm.classList.add('popup__form_hidden');
  document.querySelector('.popup__form-with-cross').classList.add('popup__form-with-cross_for-photo');      // готовим попап  
  document.querySelector('.popup').classList.add('popup_for-photo');   
  document.querySelector('.popup__photo').src = button.target.src;                                          // берем адрес и alt из таргета
  document.querySelector('.popup__photo').alt = button.target.alt;
  document.querySelector('.popup__photo-title').textContent = button.target.alt;                            // подписываем фото                                     
  document.querySelector('.popup__photo').classList.add('popup__photo_visible');                            // показываем фото
  document.querySelector('.popup__photo-title').classList.add('popup__photo-title_visible');                // показываем подпись
  popup.classList.add('popup_visible');                                                                     // показываем попап
}

//отправка форм

function bioSubmit(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;                                                    // забираем био из инпутов
  bio.textContent = inputBio.value;
  popup.classList.remove('popup_visible');                                               // прячем попап
} 

function photoSubmit(evt) {   
  evt.preventDefault();
  card = cardTemplate.cloneNode(true);                                                    // копируем шаблон

  const like = card.querySelector('.elements__like');                                     // реализуем лайки
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));
    
  const bin = card.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());                         // реализуем удаление

  const photo = card.querySelector('.elements__photo');
  photo.addEventListener('click', popupPhoto);                                            // вешаем слушатель на фото, чтобы увеличивать

  card.querySelector('.elements__title').textContent = inputTitle.value;                   // берем имя из первого инпута,
  photo.src = inputTitle.value;                                                           // фото из второго,
  photo.alt = inputLink.value;                                                            // и записываем имя в alt
  cardContainer.prepend(card);                                                             // добавляем в начало контейнера
  popup.classList.remove('popup_visible');                                                   // прячем попап
}


// стандартные карточки

initialCards.forEach(function (i) {              
  card = cardTemplate.cloneNode(true);                                                    // клонируем шаблон
  
  const like = card.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));   // реализуем лайки
  
  const bin = card.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());                        // реализуем удаление

  const photo = card.querySelector('.elements__photo');
  photo.addEventListener('click', popupPhoto);                                           // вешаем слушатель на фото, чтобы его увеличивать

  card.querySelector('.elements__title').textContent = i.name;                            // берем имя,
  photo.src = i.link;                                                                     // фото,
  photo.alt = i.name;                                                                     // и записываем имя в alt
  
  cardContainer.append(card);                                                             // добавляем в начало корнтейнера
});


editProfile.addEventListener('click', popupEdit);
addPhoto.addEventListener('click', popupAdd);
popupClose.addEventListener('click', () => {popup.classList.remove('popup_visible')});
bioForm.addEventListener('submit', bioSubmit);
photoForm.addEventListener('submit', photoSubmit)

// закрытие по клику мимо попапа

popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    evt.stopImmediatePropagation();
    popup.classList.remove('popup_visible');
  }  
});