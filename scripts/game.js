let solution;
let selectedInputBoxId;

function inputValueChecker(event) {
  const validInput = [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+event.key);
  const disabled = event.target.classList.contains('disabled');

  if (disabled || !validInput) event.preventDefault();
  else event.target.value = event.key;

  if (event.key === 'Backspace') event.target.value = '';
}

function removeSelection() {
  for (const inputBoxElement of inputBoxElements)
    // prettier-ignore
    inputBoxElement.classList.remove('highlightBox', 'highlightRow', 'highlightCol');
}

function inputBoxSelectionHandler(event) {
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

function fillBoardData(sudokuPuzzle) {
  for (let i = 1; i <= 81; i++) {
    const num = sudokuPuzzle[i - 1];
    const inputBox = document.getElementById(`inputBox-${i}`);

    if (num !== '.') {
      inputBox.value = num;
      inputBox.classList.add('disabled');
    } else inputBox.addEventListener('click', inputBoxSelectionHandler);

    inputBox.addEventListener('keydown', inputValueChecker);
  }
}

function getBoardData() {
  if (difficulty === 'Easy') difficulty = 1;
  else if (difficulty === 'Medium') difficulty = 2;
  else difficulty = 3;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '518b9825ecmshd0041d761926e8fp15b31djsn81bee8a1a774',
      'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
    },
  };

  fetch(
    `https://sudoku-board.p.rapidapi.com/new-board?diff=${difficulty}&stype=string&solu=true`,
    options
  )
    .then(response => response.json())
    .then(data => {
      fillBoardData(data.response['unsolved-sudoku']);
      solution = data.response.solution;
    })
    .catch(err => console.error(err));
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
      newInputElement.classList.add('inputBox', `row-${row}`, `col-${col}`);
      box.appendChild(newInputElement);

      if (count % 3 === 0) count += 7;
      else count++;
    }
  }

  document.getElementById('difficulty').textContent = difficulty;
  document.getElementById('mode').textContent = mode;

  getBoardData();
  gameSectionElement.style.display = 'block';

  // To increase the timer every second
  let seconds = 0;
  setInterval(() => {
    seconds++;
    let second = seconds % 60;
    let minute = Math.floor(seconds / 60);
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    timerElement.textContent = `${minute}:${second}`;
  }, 1000);
}

function numberButtonClickHandler(event) {
  const selectedInputBox = document.getElementById(selectedInputBoxId);
  if (selectedInputBox) selectedInputBox.value = event.target.textContent;
}

// To focus the selected input box always
setInterval(() => {
  const selectedInputBox = document.getElementById(selectedInputBoxId);
  if (selectedInputBox) selectedInputBox.focus();
});
