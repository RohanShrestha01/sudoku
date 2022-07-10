const playerNameInputElement = document.getElementById('player-name');
const menuOptionElements = document.querySelectorAll('.menu-option');
const optionChoiceBtns = document.querySelectorAll('.option-choice-btn');
const outlineSVGs = document.getElementsByClassName('check-circle-outline');
const solidSVGs = document.getElementsByClassName('check-circle-solid');
const startGameBtn = document.getElementById('start-game-btn');
const mainMenuElement = document.getElementById('main-menu');
const noteElement = document.getElementById('note');

document.addEventListener('keydown', keyboardNavigationHandler);
playerNameInputElement.addEventListener('input', inputFieldSVGToggler);

for (const optionChoiceBtn of optionChoiceBtns) {
  optionChoiceBtn.addEventListener('click', clickHandler);
  optionChoiceBtn.addEventListener('mousedown', event =>
    event.preventDefault()
  ); // To prevent button from getting focus while clicking it
}

menuOptionElements[0].addEventListener('click', clickHandler);
startGameBtn.addEventListener('click', startGame);
startGameBtn.addEventListener('mousedown', event => event.preventDefault());
