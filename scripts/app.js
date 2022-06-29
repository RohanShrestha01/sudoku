const playerNameInputElement = document.getElementById('player-name');
const menuOptionElements = document.querySelectorAll('.menu-option');
const optionChoiceBtns = document.querySelectorAll('.option-choice-btn');
const inputFieldSVG = document.getElementById('input-field-svg');
const outlineSVGs = document.getElementsByClassName('h-6 w-6');
const solidSVGs = document.getElementsByClassName('h-5 w-5');

document.addEventListener('keydown', keyboardNavigationHandler);
playerNameInputElement.addEventListener('input', inputFieldSVGToggler);
