const playerNameInputElement = document.getElementById('player-name');
const menuOptionElements = document.querySelectorAll('.menu-option');
const optionChoiceBtns = document.querySelectorAll('.option-choice-btn');
const outlineSVGs = document.getElementsByClassName('check-circle-outline');
const solidSVGs = document.getElementsByClassName('check-circle-solid');
const startGameBtn = document.getElementById('start-game-btn');
const mainMenuSectionElement = document.getElementById('main-menu-section');
const noteElement = document.getElementById('note');

const inputBoxElements = document.getElementsByClassName('inputBox');
const gameSectionElement = document.getElementById('game-section');
const numberButtonElements = document.querySelectorAll('aside button');
const timerElement = document.getElementById('timer');
const timerSVG = document.querySelector('#time-section svg');

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

for (const numberButtonElement of numberButtonElements)
  numberButtonElement.addEventListener('click', numberButtonClickHandler);

timerSVG.addEventListener(
  'mouseenter',
  () => (timerSVG.firstElementChild.href.baseVal = '#playSVG')
);
timerSVG.addEventListener(
  'mouseleave',
  () => (timerSVG.firstElementChild.href.baseVal = '#pauseSVG')
);
