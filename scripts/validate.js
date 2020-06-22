const validateOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

function enableValidation(options) {
  // находим формы
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  // для каждой формы
  formElements.forEach(formElement => {
      // находим ее инпуты
      const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
      // находим сабмит
      const submitButton = formElement.querySelector(options.submitButtonSelector);      
      // для всех инпутов
      inputElements.forEach(input => {
          // проверка валидности инпута
          input.addEventListener('input', element => handleInput(element, options.inputErrorClass))
      })
      formElement.addEventListener('input', () => handleFormInput(formElement, submitButton, options.inactiveButtonClass))
  })
}

function handleFormInput(formElement, submitButton, inactiveButtonClass){
  // включаем / выключаем кнопку в зависимости от валидности формы
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors);
}

function handleInput(evt, errorClass) {
  const input = evt.target;
  // ищем ошибку по id инпута + '-error'
  const error = document.querySelector(`#${input.id}-error`);

  const isInputValid = input.checkValidity();

  if (isInputValid) {
      input.classList.remove(errorClass);
      error.textContent = '';
  } else {
      input.classList.add(errorClass);
      error.textContent = input.validationMessage;
  }
}

enableValidation(validateOptions);