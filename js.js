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

//function popupToggle() {  
//  if (!popup.classList.contains('popup_visible')) {
//    inputName.value = name.textContent;                
//    inputBio.value = bio.textContent;    
// } 
//    popup.classList.toggle('popup_visible');
//};


function popupToggle (button) {
  if (popup.classList.contains('popup_visible')) { 
    popup.classList.toggle('popup_visible');
  } else {
    if (button.target.classList.contains('profile__button-edit')) {
      popupEdit (); 
    } else if (button.target.classList.contains('profile__button-add')) {
      popupAdd();
    }      
    popup.classList.add('popup_visible');
  }
}

function popupEdit() {
  popupTitle.textContent = 'Редактировать профиль';
  inputFirst.placeholder = 'Введите Ваше имя';
  inputSecond.placeholder = 'Расскажите о себе';
  inputFirst.value = name.textContent;                
  inputSecond.value = bio.textContent;
}

function popupAdd() {
  popupTitle.textContent = 'Новое место';
  inputFirst.placeholder = 'Название';
  inputSecond.placeholder = 'Ссылка на картинку';  
  inputFirst.value = '';                
  inputSecond.value = '';
}


//отправка

function popupSubmit(evt) {                              //
  evt.preventDefault();                                  //
  name.textContent = inputFirst.value;                   //перезаписываем имя и био используя
  bio.textContent = inputSecond.value;                   //значения из инпутов
  popupToggle();                                         //вызываем фунцию открытия/закрытия
}


// стандартные карточки

initialCards.forEach(function (i) {  
  const cardTemplate = document.querySelector('#card-template').content;                  // ищем шаблон
  card = cardTemplate.cloneNode(true);                                                    // клонируем его
  
  const like = card.querySelector('.elements__like');
  like.addEventListener('click', () => like.classList.toggle('elements__like_active'));   // реализуем лайки
  
  card.querySelector('.elements__title').textContent = i.name;                            // берем имя
  card.querySelector('.elements__photo').src = i.link;                                    // и фото из массива
  card.querySelector('.elements__photo').alt = 'Фотокарточка ' + i.name; 
  cardContainer.append(card);                                                             // добавляем в начало корнтейнера
});

//function addCard(link, name) {
 // const cardTemplate = document.querySelector('#card-template').content;
  //card = cardTemplate.cloneNode(true);};

 // card.querySelector('.elements__title').textContent = cardName;
 // card.querySelector('.elements__photo')  //назначить фото из ссылки
 // cardContainer.append(card);



editProfile.addEventListener('click', popupToggle);
addPhoto.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
form.addEventListener('submit', popupSubmit);


