import { WORDS, KEYBOARD_LETTERS } from "./consts";
const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
let triesLeft;
let winCount;

const createPlaceHoldersHTML = () => {
  const word = sessionStorage.getItem("word");
  const placeHolderArr = Array.from(word);
  const placeholdersHTML = placeHolderArr.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">_</h1>`,
    ""
  );
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboards = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";
  const keyboardsHTML = KEYBOARD_LETTERS.reduce((acc, letter) => {
    return (
      acc + `<button class="keyboard-button" id="${letter}">${letter}</button>`
    );
  }, "");
  keyboard.innerHTML = keyboardsHTML;
  return keyboard;
};

const createImage = () => {
  const image = document.createElement("img");
  image.classList.add("hangman-image");
  image.id = "hangman-image";
  image.alt = "Hangman image";
  image.src = "/images/hg-0.png";
  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();
  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries-left");
    triesLeft--;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-image");
    hangmanImg.src = `/images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordsArr = Array.from(word);
    wordsArr.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount++;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-image").src = "images/hg-win.png";
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header win">You won!</h2>';
  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header lose">You lost :(</h2>';
  } else if (status === "quit") {
    logoH1.classList.remove("logo-resize");
    document.getElementById("hangman-image").remove();
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="btn-primary px-5 py-2 mt-5">Play again</button>`;
  document.getElementById("play-again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;
  logoH1.classList.add("logo-resize");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);
  gameDiv.innerHTML = createPlaceHoldersHTML();
  gameDiv.innerHTML +=
    '<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>';

  const keyboardDiv = createKeyboards();
  keyboardDiv.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      checkLetter(e.target.id);
      e.target.disabled = true;
    }
  });
  gameDiv.appendChild(keyboardDiv);
  const hangmanImage = createImage();
  gameDiv.prepend(hangmanImage);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-8 py-2 mt-8">Quit</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm(
      "Are you sure you want to leave and lose your progress?"
    );
    if (isSure) {
      stopGame("quit");
    }
  };
};
