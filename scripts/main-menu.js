let selectedMenuOption = 0;
let selectedOptionChoice = 0;
let optionsChecked = 0;

function resetSVG(i) {
  outlineSVGs[i].style.display = '';
  solidSVGs[i].style.display = 'none';
  if (i === 0) {
    playerNameInputElement.value = '';
    menuOptionElements[0].classList.remove('checked');
  } else optionChoiceBtns[i - 1].classList.remove('checked');
}

function showSolidSVG(i) {
  outlineSVGs[i].style.display = 'none';
  solidSVGs[i].style.display = 'inline';
  if (i === 0) menuOptionElements[0].classList.add('checked');
  else optionChoiceBtns[i - 1].classList.add('checked');
}

function SVGChanger() {
  if (selectedMenuOption === 1) for (let i = 1; i < 4; i++) resetSVG(i);
  else if (selectedMenuOption === 2) for (let i = 4; i < 7; i++) resetSVG(i);

  if (selectedMenuOption !== 0) {
    if (playerNameInputElement.value !== '') showSolidSVG(0);

    for (let i = 1; i < outlineSVGs.length; i++)
      if (selectedOptionChoice + 1 === i) {
        showSolidSVG(i);
        break;
      }
  }
}

function inputFieldSVGToggler() {
  if (playerNameInputElement.value.length > 0) {
    outlineSVGs[0].style.display = 'inline';
    menuOptionElements[0].classList.add('checked');
  } else resetSVG(0);
}

function toggleMenuSelection(eventKey) {
  menuOptionElements[selectedMenuOption].classList.remove('selected');
  if (eventKey === 'ArrowUp') {
    selectedMenuOption--;
    if (selectedMenuOption === 0) resetSVG(0);
  } else {
    selectedMenuOption++;
    if (playerNameInputElement.value !== '') showSolidSVG(0);
  }
  menuOptionElements[selectedMenuOption].classList.add('selected');
}

function toggleOptionChoiceSelection(eventKey) {
  optionChoiceBtns[selectedOptionChoice].classList.remove('selected');
  if (eventKey === 'Enter') {
    if (selectedMenuOption === 1) selectedOptionChoice = 1;
    else if (selectedMenuOption === 2) selectedOptionChoice = 4;
  }

  if (selectedMenuOption > 0 && selectedMenuOption < 3) {
    if (eventKey === 'ArrowDown') {
      if (selectedOptionChoice === 2) selectedOptionChoice++;
      selectedOptionChoice++;
    } else if (eventKey === 'ArrowUp') {
      if (selectedOptionChoice === 3) selectedOptionChoice--;
      selectedOptionChoice--;
    }
    optionChoiceBtns[selectedOptionChoice].classList.add('selected');
  }
}

function startGame() {
  for (let i = 0; i < optionChoiceBtns.length; i++)
    if (optionChoiceBtns[i].classList.contains('checked')) optionsChecked++;

  if (playerNameInputElement.value !== '' && optionsChecked === 2) {
    document.removeEventListener('keydown', keyboardNavigationHandler);
    mainMenuElement.style.display = 'none';
  } else {
    optionsChecked = 0;
    alert('Please fill and choose all the options.');
  }
}

function keyboardNavigationHandler(event) {
  let optionSumIndex = selectedMenuOption + selectedOptionChoice;

  // For Arrow Up and Arrow Down Keys
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    const bool1 = [0, 3, 7].includes(optionSumIndex); // optionSumIndex === 0 || optionSumIndex === 3 || optionSumIndex === 7
    const bool2 = [1, 5].includes(optionSumIndex) || selectedMenuOption === 3;
    if (
      (event.key === 'ArrowDown' && bool1) ||
      (event.key === 'ArrowUp' && bool2)
    ) {
      if (selectedMenuOption === 3) selectedOptionChoice = 5;
      toggleMenuSelection(event.key);
      toggleOptionChoiceSelection(event.key);
    } else toggleOptionChoiceSelection(event.key);
  }

  // For Enter Key
  else if (event.key === 'Enter') {
    if (selectedMenuOption < 3) {
      SVGChanger();
      toggleMenuSelection(event.key);
      toggleOptionChoiceSelection(event.key);
    } else if (selectedMenuOption === 3) startGame();
  }

  // For Space Key (To not allow spaces in the player name)
  else if (event.key === ' ') event.preventDefault();

  if (selectedMenuOption === 0) playerNameInputElement.focus();
  else playerNameInputElement.blur();
}

function clickHandler(event) {
  const classList = event.target.classList;
  menuOptionElements[selectedMenuOption].classList.remove('selected');
  optionChoiceBtns[selectedOptionChoice].classList.remove('selected');
  if (classList.contains('m-1')) selectedMenuOption = 1;
  else if (classList.contains('m-2')) selectedMenuOption = 2;
  else {
    selectedMenuOption = 0;
    selectedOptionChoice = 0;
  }

  for (let i = 0; i < optionChoiceBtns.length; i++)
    if (event.target === optionChoiceBtns[i]) {
      selectedOptionChoice = i;
      optionChoiceBtns[selectedOptionChoice].classList.add('selected');
      break;
    }

  menuOptionElements[selectedMenuOption].classList.add('selected');

  if (selectedMenuOption === 0) resetSVG(0);
  SVGChanger();
}
