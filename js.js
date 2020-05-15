const popup = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__button-edit');
const addPhoto = document.querySelector('.profile__button-add');
let name = document.querySelector('.profile__name');
let bio = document.querySelector('.profile__bio');
let inputName = document.querySelector('.popup__input_name');
let inputBio = document.querySelector('.popup__input_bio');
const popupClose = document.querySelector('.popup__exit');
const form = document.querySelector('.popup__form');

//открытие/закрытие

function popupToggle() {  
  if (popup.classList.contains('popup_visible') === 1) { //проверяем виден ли попап
    popup.classList.toggle('popup_visible');             //если виден, скрываем
  } else {
    inputName.value = name.textContent;                  //если нет то перезаписываем 
    inputBio.value = bio.textContent;                    //значения полей ввода
    popup.classList.toggle('popup_visible');             //и показываем попап
  }
}

//отправка

function popupSubmit(evt) {                              //
  evt.preventDefault();                                  //
  name.textContent = inputName.value;                    //перезаписываем имя и био используя
  bio.textContent = inputBio.value;                      //значения из инпутов
  popupToggle();                                         //вызываем фунцию открытия/закрытия
}

editProfile.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
form.addEventListener('submit', popupSubmit);