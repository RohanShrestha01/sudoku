// For Keyboard Navigation
let selectedMenuOption = 0;
let selectedOptionChoice = 0;
let optionsSelected = 0;

function SVGChanger() {
  if (selectedMenuOption === 1)
    for (let i = 1; i < 4; i++) {
      outlineSVGs[i].style.visibility = '';
      solidSVGs[i].style.display = 'none';
    }
  else if (selectedMenuOption === 2)
    for (let i = 4; i < 7; i++) {
      outlineSVGs[i].style.visibility = '';
      solidSVGs[i].style.display = 'none';
    }

  if (selectedMenuOption === 0) {
    if (playerNameInputElement.value !== '') {
      outlineSVGs[0].style.visibility = 'hidden';
      solidSVGs[0].style.display = 'inline';
    }
  } else
    for (let i = 1; i < outlineSVGs.length; i++)
      if (selectedOptionChoice + 1 === i) {
        outlineSVGs[i].style.visibility = 'hidden';
        solidSVGs[i].style.display = 'inline';
        break;
      }
}

function inputFieldSVGToggler() {
  if (playerNameInputElement.value.length > 0)
    inputFieldSVG.style.visibility = 'visible';
  else {
    inputFieldSVG.style.visibility = 'hidden';
    solidSVGs[0].style.display = 'none';
  }
}

function toggleMenuSelection(eventKey) {
  menuOptionElements[selectedMenuOption].classList.remove('selected');
  if (eventKey === 'ArrowUp') {
    selectedMenuOption--;
    if (optionsSelected > 0) optionsSelected--;
  } else selectedMenuOption++;
  menuOptionElements[selectedMenuOption].classList.add('selected');
}

function toggleOptionChoiceSelection(eventKey) {
  optionChoiceBtns[selectedOptionChoice].classList.remove('selected');
  if (eventKey === 'Enter') {
    if (selectedMenuOption === 1) selectedOptionChoice = 1;
    else if (selectedMenuOption === 2) selectedOptionChoice = 4;
    if (selectedMenuOption !== 1) optionsSelected++;
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

function keyboardNavigationHandler(event) {
  let optionSumIndex = selectedMenuOption + selectedOptionChoice;

  if (event.key === 'ArrowDown') {
    if (optionSumIndex === 0 || optionSumIndex === 3 || optionSumIndex === 7) {
      toggleMenuSelection(event.key);
      toggleOptionChoiceSelection(event.key);
    } else {
      toggleOptionChoiceSelection(event.key);
    }
  } else if (event.key === 'ArrowUp') {
    if (
      optionSumIndex === 1 ||
      optionSumIndex === 5 ||
      selectedMenuOption === 3
    ) {
      if (selectedMenuOption === 3) selectedOptionChoice = 5;
      toggleMenuSelection(event.key);
      toggleOptionChoiceSelection(event.key);
    } else {
      toggleOptionChoiceSelection(event.key);
    }
    if (selectedMenuOption === 0) {
      playerNameInputElement.value = '';
      inputFieldSVGToggler();
    }
  } else if (event.key === 'Enter') {
    if (selectedMenuOption < 3) {
      SVGChanger();
      toggleMenuSelection(event.key);
      toggleOptionChoiceSelection(event.key);
    } else if (selectedMenuOption === 3) {
      if (playerNameInputElement.value !== '' && optionsSelected === 2)
        document.removeEventListener('keydown', keyboardNavigationHandler);
    }
  } else if (event.key === ' ') {
    event.preventDefault();
  }

  if (selectedMenuOption === 0) playerNameInputElement.focus();
  else playerNameInputElement.blur();
}
