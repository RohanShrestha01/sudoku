const playerNameInputElement = document.getElementById('player-name');
const menuOptionElements = document.querySelectorAll('.menu-option');
const optionChoiceBtns = document.querySelectorAll('.option-choice-btn');
const checkCircleSVGs = document.getElementsByClassName('check-circle-svg');
const startGameBtn = document.getElementById('start-game-btn');
const mainMenuSectionElement = document.getElementById('main-menu-section');
const noteElement = document.getElementById('note');

const inputBoxElements = document.getElementsByClassName('inputBox');
const gameSectionElement = document.getElementById('game-section');
const numberButtonElements = document.querySelectorAll('aside button');
const showSolnButton = document.getElementById('showSoln');
const resetBoardButton = document.getElementById('resetBoard');
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
startGameBtn.addEventListener('click', clickHandler);
startGameBtn.addEventListener('mousedown', event => event.preventDefault());

for (const numberButtonElement of numberButtonElements)
  numberButtonElement.addEventListener('click', numberButtonClickHandler);

timerSVG.addEventListener(
  'mouseenter',
  () => (timerSVG.firstElementChild.href.baseVal = '#pauseSolid')
);
timerSVG.addEventListener(
  'mouseleave',
  () => (timerSVG.firstElementChild.href.baseVal = '#pauseOutline')
);

showSolnButton.addEventListener('click', showSoln);
resetBoardButton.addEventListener('click', resetBoard);
