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
    let keyPressed = event.key;
    keyPressed = keyPressed.toLowerCase();

    // only interested in letters and numbers
    let isSingleCharacter = keyPressed.length === 1;
    let isLetter = keyPressed >= 'a' && keyPressed <= 'z';
    let isNumber = keyPressed >= '0' && keyPressed <= '9';
    let isSpace = keyPressed === ' ';
    if (!isSingleCharacter) { return; }
    if (!isLetter && !isNumber && !isSpace) {
      return;
    }

    let currentLetter = sentence.charAt(currentLetterIndex);
    let allLetterElements = document.querySelectorAll(".letter");
    let currentLetterElement = allLetterElements[currentLetterIndex];

    currentLetterElement.classList.remove("pass");
    currentLetterElement.classList.remove("fail");

    // if the correct letter was pressed
    if (currentLetter === keyPressed) {
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
