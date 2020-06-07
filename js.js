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
  if (popup.classList.contains('popup_visible')) { 
    popup.classList.toggle('popup_visible');
  } else {
    if (button.target === editProfile) {
      popupEdit (); 
    } else {
      if (button.target === addPhoto) {
        popupAdd();
      } else {
        if (button.target === card.querySelector('.elements__photo')) {
          popupPhoto();
        }}}
    popup.classList.toggle('popup_visible');
  }
}


// редактирование био

function popupEdit() {
  form.classList.remove('popup__form_hidden');
  popupTitle.textContent = 'Редактировать профиль';
  inputFirst.placeholder = 'Введите Ваше имя';
  inputSecond.placeholder = 'Расскажите о себе';
  inputFirst.value = name.textContent;                
  inputSecond.value = bio.textContent;
}

//добавление фотокарточки

function popupAdd() {
  form.classList.remove('popup__form_hidden');
  popupTitle.textContent = 'Новое место';
  inputFirst.placeholder = 'Название';
  inputSecond.placeholder = 'Ссылка на картинку';  
  inputFirst.value = '';                
  inputSecond.value = '';
}

//просмотр фото

function popupPhoto() {
  console.log('gg');
  form.classList.add('popup__form_hidden');
}

//отправка формы

function popupSubmit(evt) {
  evt.preventDefault();
  if (popupTitle.textContent === 'Редактировать профиль') {
    name.textContent = inputFirst.value;
    bio.textContent = inputSecond.value;
  } else if (popupTitle.textContent === 'Новое место') {   
    card = cardTemplate.cloneNode(true);        

    const like = card.querySelector('.elements__like');
    like.addEventListener('click', () => like.classList.toggle('elements__like_active'));
    
    const bin = card.querySelector('.elements__trash-bin');
    bin.addEventListener('click', () => bin.parentElement.remove());

    const photo = card.querySelector('.elements__photo');
    photo.addEventListener('click', popupPhoto);

    card.querySelector('.elements__title').textContent = inputFirst.value;
    photo.src = inputSecond.value;
    photo.alt = 'Фотокарточка ' + inputFirst.value; 
    cardContainer.prepend(card);       
  }
  popupToggle();
}


// стандартные карточки

initialCards.forEach(function (i) {              
  card = cardTemplate.cloneNode(true);                                                    // клонируем шаблон
  
  const like = card.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));   // реализуем лайки
  
  const bin = card.querySelector('.elements__trash-bin');
  bin.addEventListener('click', () => bin.parentElement.remove());

  const photo = card.querySelector('.elements__photo');
  photo.addEventListener('click', popupPhoto);

  card.querySelector('.elements__title').textContent = i.name;                            // берем имя
  photo.src = i.link;                                    // и фото из массива
  photo.alt = 'Фотокарточка ' + i.name; 
  cardContainer.append(card);                                                             // добавляем в начало корнтейнера
});


editProfile.addEventListener('click', popupToggle);
addPhoto.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
form.addEventListener('submit', popupSubmit);