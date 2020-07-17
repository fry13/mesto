export {FormValidator};

class FormValidator {
  constructor(options, form){
    this._options = options;
    this._form = form;
  }

  enableValidation() {
    const inputElements = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    const submitButton = this._form.querySelector(this._options.submitButtonSelector);
    inputElements.forEach(input => {
      input.addEventListener('input', element => this._handleInput(element, this._options.inputErrorClass))
    });
    this._form.addEventListener('input', () => this._handleFormInput(this._form, submitButton, this._options.inactiveButtonClass));
  }

  _handleFormInput(formElement, submitButton, inactiveButtonClass){
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);
  }

  _handleInput(evt, errorClass) {
    const input = evt.target;
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
}
