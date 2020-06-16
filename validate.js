// показ ошибки

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// скрытие ошибки

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__error_visible');
};

// проверка инпута на валидность

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

// вешаем слушатели ввода на инпуты

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);      
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// запуск проверки на валидацию

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  setEventListeners(formElement);
});
};

// ищем невалидные инпуты

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// проверка состояния кнопки сабмит

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__save_disabled');
    buttonElement.disabled = false;
  };
};

enableValidation();