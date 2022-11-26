var throttle = require('lodash.throttle');

const feedbackForm = document.querySelector(`.feedback-form`);
// const btnSubmitForm = document.querySelector(`.feedback-form`);

const KEY_STORAGE = `feedback-form-state`;

restTextInput();

let formData = {};
if (callbackLocalStorage()) {
  formData = callbackLocalStorage();
}

feedbackForm.addEventListener(`submit`, onBtnForm);
feedbackForm.addEventListener(`input`, throttle(saveCurrentTextInput, 500));

function saveCurrentTextInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
  //   console.log(formData);
}

function restTextInput(event) {
  const parsedData = callbackLocalStorage();
  if (parsedData) {
    feedbackForm[0].value = parsedData[feedbackForm[0].name];
    feedbackForm[1].value = parsedData[feedbackForm[1].name];
  }
}

function onBtnForm(e) {
  e.preventDefault();
  console.log(`${feedbackForm[0].name} = ${feedbackForm[0].value}`);
  console.log(`${feedbackForm[1].name} = ${feedbackForm[1].value}`);

  e.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function callbackLocalStorage() {
  const saveData = localStorage.getItem(KEY_STORAGE);
  if (saveData) {
    return JSON.parse(saveData);
  }
}
