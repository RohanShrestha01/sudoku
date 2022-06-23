const playerNameInputElement = document.getElementById('player-name');
const menuOptionElements = document.querySelectorAll('.menu-option');
const optionChoiceBtns = document.querySelectorAll('.option-choice-btn');
const inputFieldSVG = document.getElementById('input-field-svg');
const optionSVGs = document.getElementsByClassName('check-circle-outline');

document.addEventListener('keydown', keyboardNavigationHandler);
playerNameInputElement.addEventListener('input', inputFieldSVGToggler);
