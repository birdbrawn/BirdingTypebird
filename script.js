window.addEventListener("load", onLoad);

function onLoad() {

  // Setup
  let sentence = "the quick brown fox jumps over";
  let currentLetterIndex = 0;

  setupTypingTutor();

  function setupTypingTutor() {
    let sentenceElement = document.querySelector(".sentence");
    for (let i = 0; i < sentence.length; ++i) {
      let singleWord = document.createElement("span");
      singleWord.classList.add("letter");
      singleWord.textContent = sentence.charAt(i);
  
      sentenceElement.append(singleWord);
    }
    highlightCurrentLetter();
    
    document.addEventListener("keydown", checkKeyPress);
  }

  function checkKeyPress(event) {
    // only interested in letters and numbers
    let isLetter = event.keyCode >= 65 && event.keyCode <= 90;
    let isNumber = event.keyCode >= 48 && event.keyCode <= 57;
    let isSpace = event.keyCode === 32;
    if (!isLetter && !isNumber && !isSpace) {
      return;
    }

    let currentLetter = sentence.charAt(currentLetterIndex);
    let allLetterElements = document.querySelectorAll(".letter");
    let currentLetterElement = allLetterElements[currentLetterIndex];

    currentLetterElement.classList.remove("pass");
    currentLetterElement.classList.remove("fail");

    let letterPressed = event.key;
    letterPressed = letterPressed.toLowerCase();

    // if the correct letter was pressed
    if (currentLetter === letterPressed) {
      currentLetterElement.classList.add("pass");
      currentLetterIndex++;

      if (currentLetter === " ") {
        currentLetterElement.textContent = "_";
      }

      unhighlightAllLetters();
      highlightCurrentLetter();
    // if the wrong letter was pressed
    } else {
      currentLetterElement.classList.add("fail");
    }
  }

  function highlightCurrentLetter() {
    let allLetterElements = document.querySelectorAll(".letter");
    let currentLetterElement = allLetterElements[currentLetterIndex];

    currentLetterElement.classList.add("current");
  }

  function unhighlightAllLetters() {
    let allLetterElements = document.querySelectorAll(".letter");
    allLetterElements.forEach(letterElement => {
      letterElement.classList.remove("current");
    });
  }
}
