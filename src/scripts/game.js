const DIFFICULTY_EASY = 'Easy';
const DIFFICULTY_MEDIUM = 'Medium';
const DIFFICULTY_HARD = 'Hard';

const MODE_TIMER = 'Timer';
const MODE_COUNTDOWN = 'Countdown';
const MODE_HINTS = 'Hints';

const TIME_EASY_SECONDS = 600;
const TIME_EASY_TEXT = '10:00';
const TIME_MEDIUM_SECONDS = 900;
const TIME_MEDIUM_TEXT = '15:00';
const TIME_HARD_SECONDS = 1200;
const TIME_HARD_TEXT = '20:00';

const HINTS_EASY = 40;
const HINTS_MEDIUM = 50;
const HINTS_HARD = 60;

let solution, puzzle;
let selectedInputBoxId;
let userInput = [];
let seconds = 0;
let numOfHints;
let counter = null;
let showSolution = false;
let restart = false;

window.onbeforeunload = function () {
  return 'Data will be lost if you leave the page, are you sure?';
};

// To increase the timer every second
function startCounting() {
  counter = setInterval(() => {
    if (mode === MODE_COUNTDOWN) seconds--;
    else seconds++;

    let second = seconds % 60;
    let minute = Math.floor(seconds / 60);
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    timerElement.textContent = `${minute}:${second}`;

    if (mode === MODE_COUNTDOWN && seconds === 0) showResult("Time's Up ⌛");
  }, 1000);
}

function showResult(resultText) {
  clearInterval(counter);
  const name = playerNameInputElement.value;
  resultHeaderEl.textContent = resultText;
  playerNameResultEl.textContent = name;
  difficultyResultEl.textContent = difficulty;
  modeResultEl.textContent = mode;
  timeResultEl.textContent = timerElement.textContent;

  resultSection.classList.add('open');
  backdropElement.classList.add('open');
}

function checkForWin() {
  for (let i = 0; i < 81; i++) if (userInput[i] !== solution[i]) return;
  if (!showSolution) showResult('Completed 🎉');
}

function incorrectNumChecker(arr) {
  for (let i = 0; i < 9; i++)
    for (let j = i + 1; j < 9; j++)
      if (arr[i].value === arr[j].value && arr[i].value != '') {
        arr[i].classList.add('incorrect');
        arr[j].classList.add('incorrect');
      }
}

function checkForIncorrectNum() {
  for (const inputBoxElement of inputBoxElements)
    inputBoxElement.classList.remove('incorrect');

  for (let i = 1; i <= 81; i++) {
    const inputBox = document.getElementById(`inputBox-${i}`);
    const row = inputBox.dataset.row;
    const col = inputBox.dataset.col;

    const rowElements = document.getElementsByClassName(`row-${row}`);
    const colElements = document.getElementsByClassName(`col-${col}`);
    const boxElements = inputBox.parentElement.children;

    incorrectNumChecker(rowElements);
    incorrectNumChecker(colElements);
    incorrectNumChecker(boxElements);
  }
}

function numberButtonClickHandler(event) {
  const selectedInputBox = document.getElementById(selectedInputBoxId);

  if (selectedInputBox) {
    const disabled = selectedInputBox.classList.contains('disabled');
    if (!disabled) {
      selectedInputBox.value = event.target.textContent;
      userInput[selectedInputBoxId.slice(9) - 1] = event.target.textContent;
    }
    checkForIncorrectNum();
    checkForWin();
  }
}

function inputValueChecker(event) {
  const selectedInputBox = document.getElementById(selectedInputBoxId);

  if (selectedInputBox) {
    const disabled = selectedInputBox.classList.contains('disabled');
    const validInput = [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+event.key);
    const inputBoxNum = selectedInputBoxId.slice(9);

    if (disabled || !validInput) event.preventDefault();
    else {
      selectedInputBox.value = event.key;
      userInput[inputBoxNum - 1] = event.key;
    }

    if (event.key === 'Backspace' && !disabled) {
      selectedInputBox.value = '';
      userInput[inputBoxNum - 1] = '';
    }
    checkForIncorrectNum();
    checkForWin();
  }
}

function resetClassList() {
  // prettier-ignore
  for (const inputBoxElement of inputBoxElements) {
    inputBoxElement.classList.remove('highlightBox', 'highlightRow', 'highlightCol', 'disabled', 'incorrect');
    inputBoxElement.removeAttribute('value');
  }
}

function showSoln() {
  clearInterval(counter);
  resetClassList();
  fillBoardData(solution);
  showSolution = true;
}

function resetBoard() {
  resetClassList();
  fillBoardData(puzzle);
  if (showSolution) startCounting();
  showSolution = false;
  selectedInputBoxId = null;
}

function showHint() {
  const selectedInputBox = document.getElementById(selectedInputBoxId);
  if (selectedInputBox && numOfHints > 0 && !showSolution) {
    const inputBoxNum = selectedInputBoxId.slice(9);
    userInput[inputBoxNum - 1] = solution[inputBoxNum - 1];
    selectedInputBox.value = solution[inputBoxNum - 1];
    if (!selectedInputBox.classList.contains('disabled')) numOfHints--;
    hintNumElement.textContent = numOfHints;
    selectedInputBox.classList.add('disabled');
    checkForIncorrectNum();
    checkForWin();
  }
}

function closePauseOverlay() {
  pauseSectionElement.classList.remove('open');
  backdropElement.classList.remove('open');

  for (const inputBoxEl of inputBoxElements)
    inputBoxEl.setAttribute('type', 'text');
}

function pauseGame() {
  clearInterval(counter);
  document.removeEventListener('keydown', inputValueChecker);
  for (const inputBoxEl of inputBoxElements)
    inputBoxEl.setAttribute('type', 'hidden');

  pauseSectionElement.classList.add('open');
  backdropElement.classList.add('open');
}

function resumeGame() {
  closePauseOverlay();
  if (!showSolution) {
    startCounting();
    document.addEventListener('keydown', inputValueChecker);
  }
}

function resetForRestart() {
  restart = true;
  selectedInputBoxId = null;
  showSolution = false;
  clearInterval(counter);
  resetClassList();
  closePauseOverlay();
  document.removeEventListener('keydown', inputValueChecker);
}

function restartGame() {
  resetForRestart();
  startGame();
}

function mainMenu() {
  resetForRestart();
  resultSection.classList.remove('open');
  document.addEventListener('keydown', keyboardNavigationHandler);
  optionsChecked = 0;
  noteElement.textContent = 'You can use Arrow Keys and Enter to Navigate';
  noteElement.style.color = '';
  gameSectionElement.style.display = 'none';
  mainMenuSectionElement.style.display = 'flex';
}

function removeSelection() {
  // prettier-ignore
  for (const inputBoxElement of inputBoxElements)
    inputBoxElement.classList.remove('highlightBox', 'highlightRow', 'highlightCol');
}

function inputBoxSelectionHandler(event) {
  if (!event.target.classList.contains('inputBox')) return;
  removeSelection();
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  const rowElements = document.getElementsByClassName(`row-${row}`);
  const colElements = document.getElementsByClassName(`col-${col}`);
  selectedInputBoxId = event.target.id;

  event.target.classList.add('highlightBox');
  for (const rowEl of rowElements) rowEl.classList.add('highlightRow');
  for (const colEl of colElements) colEl.classList.add('highlightCol');
}

function setHintsNum() {
  if (difficulty === DIFFICULTY_EASY) numOfHints = HINTS_EASY;
  else if (difficulty === DIFFICULTY_MEDIUM) numOfHints = HINTS_MEDIUM;
  else numOfHints = HINTS_HARD;
  hintNumElement.textContent = numOfHints;
}

function setTimer() {
  if (mode === MODE_COUNTDOWN) {
    if (difficulty === DIFFICULTY_EASY) {
      timerElement.textContent = TIME_EASY_TEXT;
      seconds = TIME_EASY_SECONDS;
    } else if (difficulty === DIFFICULTY_MEDIUM) {
      timerElement.textContent = TIME_MEDIUM_TEXT;
      seconds = TIME_MEDIUM_SECONDS;
    } else {
      timerElement.textContent = TIME_HARD_TEXT;
      seconds = TIME_HARD_SECONDS;
    }
  } else {
    timerElement.textContent = '00:00';
    seconds = 0;
  }
}

function fillBoardData(sudokuPuzzle) {
  for (let i = 1; i <= 81; i++) {
    const num = sudokuPuzzle[i - 1];
    const inputBox = document.getElementById(`inputBox-${i}`);

    if (num !== '.') {
      inputBox.value = num;
      inputBox.classList.add('disabled');
      userInput[i - 1] = num;
    } else {
      inputBox.value = '';
      userInput[i - 1] = '';
    }
  }

  gameBoardElement.addEventListener('click', inputBoxSelectionHandler);
}

function hideSpinner() {
  backdropElement.style.transition = '';
  backdropElement.classList.remove('open');
  spinnerElement.style.display = 'none';
}

function showSpinner() {
  backdropElement.style.transition = 'none'; // To not allow hover on input box due to .2s visibility transition of backdrop
  backdropElement.classList.add('open');
  spinnerElement.style.display = 'block';
}

function getBoardData() {
  fetch(`/.netlify/functions/board-data?difficulty=${difficulty}`)
    .then(response => response.json())
    .then(data => {
      puzzle = data.puzzle;
      fillBoardData(puzzle);
      solution = data.solution;
      startCounting();
    })
    .catch(() => {
      alert('Failed to fetch board data from API - Please Try Again');
      mainMenu();
    })
    .finally(hideSpinner);
}

function createBoard() {
  let count = 0;
  for (let i = 1; i <= 9; i++) {
    const box = document.getElementById(`box-${i}`);

    if (i === 1) count = 1;
    else if (i === 2) count = 4;
    else if (i === 3) count = 7;
    else if (i === 4) count = 28;
    else if (i === 5) count = 31;
    else if (i === 6) count = 34;
    else if (i === 7) count = 55;
    else if (i === 8) count = 58;
    else if (i === 9) count = 61;

    for (let j = 1; j <= 9; j++) {
      const row = Math.ceil(count / 9);
      const col = count % 9 ? count % 9 : 9;

      const newInputElement = document.createElement('input');
      newInputElement.setAttribute('type', 'text');
      newInputElement.setAttribute('maxlength', '1');
      newInputElement.setAttribute('data-row', row);
      newInputElement.setAttribute('data-col', col);
      newInputElement.setAttribute('id', `inputBox-${count}`);
      newInputElement.setAttribute('readonly', 'true');
      newInputElement.classList.add('inputBox', `row-${row}`, `col-${col}`);
      box.appendChild(newInputElement);

      if (count % 3 === 0) count += 7;
      else count++;
    }
  }
}

function startGame() {
  setTimer();
  showSpinner();
  getBoardData();
  if (!restart) createBoard();

  document.getElementById('difficulty').textContent = difficulty;
  document.getElementById('mode').textContent = mode;

  if (mode === MODE_HINTS) {
    hintButton.style.display = 'inline';
    setHintsNum();
  } else hintButton.style.display = 'none';

  gameSectionElement.style.display = 'block';
  document.addEventListener('keydown', inputValueChecker);
}
