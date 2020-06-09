const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__exit');
const form = document.querySelector('.popup__form');

const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');

let name = document.querySelector('.profile__name');
let bio = document.querySelector('.profile__bio');
let inputFirst = document.querySelector('.popup__input_name');
let inputSecond = document.querySelector('.popup__input_bio');

const cardContainer = document.querySelector('.elements');
let card = document.querySelector('.elements__card');
const cardTemplate = document.querySelector('#card-template').content; 
let popupTitle = popup.querySelector('.popup__title');

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


//открытие/закрытие

function popupToggle (button) {
  if (popup.classList.contains('popup_visible')) {                           // если открыт,
    popup.classList.toggle('popup_visible');                                 // закрыть.
  } else {                                                                   // иначе,
      if (button.target === editProfile) {                                   // если тыкаем на карандаш, то
        popupEdit ();                                                        // вызываем редактирование био.
      } else {                                                               // инчае,
          if (button.target === addPhoto) {                                  // если тыкаем на плюс, то 
            popupAdd();                                                      // вызывавем добавление фото.
          } else {                                                           // иначе,
            if (button.target.classList.contains('elements__photo')) {       // если тыкаем на фото, то
              popupPhoto(button);                                            // вызываем полноразмерное фото.
            }
          }
      }
    popup.classList.toggle('popup_visible');                                 // открываем попап
  }
}


// редактирование био

function popupEdit() {
  document.querySelector('.popup__form-with-cross').classList.remove('popup__form-with-cross_for-photo'); // готовим форму.
  document.querySelector('.popup__photo').classList.remove('popup__photo_visible');                       //
  document.querySelector('.popup').classList.remove('popup_for-photo');                                   // убираем увеличенное фото.
  document.querySelector('.popup__photo-title').classList.remove('popup__photo-title_visible');           // убираем подпись под увеличенным фото.
  form.classList.remove('popup__form_hidden');                                                            // показываем форму.
  popupTitle.textContent = 'Редактировать профиль';                                                       // изменяем надписи на форме
  inputFirst.placeholder = 'Введите Ваше имя';
  inputSecond.placeholder = 'Расскажите о себе';
  inputFirst.value = name.textContent;                                                                     // заполняем инпуты из био
  inputSecond.value = bio.textContent;
}

//добавление фотокарточки

function popupAdd() {
  document.querySelector('.popup__form-with-cross').classList.remove('popup__form-with-cross_for-photo');  // готовим форму
  document.querySelector('.popup__photo').classList.remove('popup__photo_visible');                        // 
  document.querySelector('.popup').classList.remove('popup_for-photo');                                    // убираем увеличенное фото.
  document.querySelector('.popup__photo-title').classList.remove('popup__photo-title_visible');            // убираем подпись под увеличенным фото.
  form.classList.remove('popup__form_hidden');                                                             // показываем форму.
  popupTitle.textContent = 'Новое место';                                                                  // изменяем надписи на форме
  inputFirst.placeholder = 'Название';
  inputSecond.placeholder = 'Ссылка на картинку';  
  inputFirst.value = '';                                                                                   // очищаем инпуты
  inputSecond.value = '';
}

//просмотр фото

function popupPhoto(button) {
  form.classList.add('popup__form_hidden');                                                                 // прячем форму
  document.querySelector('.popup__form-with-cross').classList.add('popup__form-with-cross_for-photo');      // готовим попап  
  document.querySelector('.popup').classList.add('popup_for-photo');   
  document.querySelector('.popup__photo').src = button.target.src;                                          // берем адрес и alt из таргета
  document.querySelector('.popup__photo').alt = button.target.alt;
  document.querySelector('.popup__photo-title').textContent = button.target.alt;                            // подписываем фото                                     
  document.querySelector('.popup__photo').classList.add('popup__photo_visible');                            // показываем фото
  document.querySelector('.popup__photo-title').classList.add('popup__photo-title_visible');                // показываем подпись
}

//отправка формы

function popupSubmit(evt) {
  evt.preventDefault();
  if (popupTitle.textContent === 'Редактировать профиль') {                                 // если редактируем био, то
    name.textContent = inputFirst.value;                                                    // забираем био из инпутов
    bio.textContent = inputSecond.value;
  } else if (popupTitle.textContent === 'Новое место') {                                    // иначе, если добавляем карточку, то
    card = cardTemplate.cloneNode(true);                                                    // копируем шаблон

    const like = card.querySelector('.elements__like');                                     // реализуем лайки
    like.addEventListener('click', () => like.classList.toggle('elements__like_active'));
    
    const bin = card.querySelector('.elements__trash-bin');
    bin.addEventListener('click', () => bin.parentElement.remove());                         // реализуем удаление

    const photo = card.querySelector('.elements__photo');
    photo.addEventListener('click', popupToggle);                                            // вешаем слушатель на фото, чтобы увеличивать

    card.querySelector('.elements__title').textContent = inputFirst.value;                   // берем имя из первого инпута,
    photo.src = inputSecond.value;                                                           // фото из второго,
    photo.alt = inputFirst.value;                                                            // и записываем имя в alt
    cardContainer.prepend(card);                                                             // добавляем в начало контейнера
  }
  popupToggle();                                                                             // прячем попап
}


// стандартные карточки

initialCards.forEach(function (i) {              
  card = cardTemplate.cloneNode(true);                                                    // клонируем шаблон
  
  const like = card.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));   // реализуем лайки
  
  const bin = card.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());                        // реализуем удаление

  const photo = card.querySelector('.elements__photo');
  photo.addEventListener('click', popupToggle);                                           // вешаем слушатель на фото, чтобы его увеличивать

  card.querySelector('.elements__title').textContent = i.name;                            // берем имя,
  photo.src = i.link;                                                                     // фото,
  photo.alt = i.name;                                                                     // и записываем имя в alt
  
  cardContainer.append(card);                                                             // добавляем в начало корнтейнера
});


editProfile.addEventListener('click', popupToggle);
addPhoto.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
form.addEventListener('submit', popupSubmit);