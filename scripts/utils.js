export {openPopup, closePopup};

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

