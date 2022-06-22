// For Keyboard Navigation
let mainMenu = true;
let selectedMenuOption = 0;
let selectedOptionChoice = 0;
let optionsSelected = 0;

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

  if (selectedMenuOption > 0 && selectedMenuOption < 3) {
    if (eventKey === 'ArrowDown') {
      if (selectedOptionChoice === 2) selectedOptionChoice++;
      selectedOptionChoice++;
    } else if (eventKey === 'ArrowUp') {
      if (selectedOptionChoice === 3) selectedOptionChoice--;
      selectedOptionChoice--;
    } else if (eventKey === 'Enter') {
      if (selectedMenuOption === 1) selectedOptionChoice = 1;
      else if (selectedMenuOption === 2) selectedOptionChoice = 4;
      if (selectedMenuOption !== 1) optionsSelected++;
    }
    optionChoiceBtns[selectedOptionChoice].classList.add('selected');
  }
}

function menuOptionSelectionHandler(event) {
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
    if (selectedMenuOption === 0) playerNameInputElement.value = '';
  } else if (event.key === 'Enter') {
    if (selectedMenuOption < 3) {
      toggleMenuSelection(event.key);
      toggleOptionChoiceSelection(event.key);
    } else if (selectedMenuOption === 3) {
      if (playerNameInputElement.value.trim() !== '') optionsSelected++;
      if (optionsSelected === 3) console.log('Success');
      else console.log('fill all the details');
    }
  }
  console.log(optionsSelected);
  if (selectedMenuOption === 0) playerNameInputElement.focus();
  else playerNameInputElement.blur();
}
