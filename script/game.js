var gameCard = document.querySelector("#gameCard");
var timer = document.querySelector("#timer");
var hint = document.querySelector("#hint");
var attempt = document.querySelector("#attempt");
var redirect = document.querySelector("#redirect");

var timeLeft = 30;
var endOfGame = false;
var index = 0;
var success = false;

var key = "";

const wordMeaning = JSON.parse(localStorage.getItem("wordMeaning"));

const myTimer = setInterval(() => {
  if (timeLeft > 0) {
    timer.textContent = `Time Left: ${timeLeft}`;
    timeLeft--;
  } else {
    timer.textContent = "Time is up!";
    clearInterval(myTimer);
    endOfGame = true;
    gameOver();
  }
}, 1000);

function createKeyboard() {
  const keyButtonsAlpha = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
  var keyboard = document.querySelector("#keyboard");
  var row0 = document.querySelector("#row0");
  var row1 = document.querySelector("#row1");
  var row2 = document.querySelector("#row2");

  keyboard.setAttribute(
    "style",
    "display: flex; flex-direction: column; justify-content: center; align-items: center;"
  );
  row0.setAttribute("style", "display: flex;");
  row1.setAttribute("style", "display: flex;");
  row2.setAttribute("style", "display: flex;");

  for (var i = 0; i < keyButtonsAlpha.length; i++) {
    var keyButton = document.createElement("button");
    keyButton.textContent = keyButtonsAlpha[i];
    keyButton.setAttribute("class", "keyButton");
    keyButton.setAttribute("id", `key${keyButtonsAlpha[i]}`);
    keyButton.setAttribute("data-alpha", keyButtonsAlpha[i]);

    keyButton.addEventListener("click", (event) => {
      key = event.target.dataset.alpha;
    });

    if (i < 10) {
      row0.appendChild(keyButton);
    } else if (i < 19) {
      row1.appendChild(keyButton);
    } else {
      row2.appendChild(keyButton);
    }
  }
}

function renderQuiz() {
  var word = wordMeaning.word;
  var meaning = wordMeaning.meaning;

  hint.textContent = `Hint: ${meaning}`;

  for (var i = 0; i < word.length; i++) {
    const letter = document.createElement("label");
    letter.textContent = "_";
    letter.setAttribute("data-index", i);
    letter.setAttribute("data-alpha", word[i].toUpperCase());
    letter.setAttribute("class", "letter");
    letter.setAttribute("data-state", "hidden");

    gameCard.appendChild(letter);
  }
}

function handleKeyDown(event) {
  var keyPressed = event.key.toUpperCase();
  var keyButton = document.querySelector(`#key${keyPressed}`);

  keyButton.click();
}

function gameOver() {
  clearInterval(myTimer);
  clearInterval(myGameLoop);

  if (success) {
    hint.textContent = "You get it!";
  } else {
    hint.textContent = "Game over!";
    var letters = document.querySelectorAll(".letter");
    for (var i = 0; i < letters.length; i++) {
      if (letters[i].dataset.state === "hidden") {
        letters[i].setAttribute("data-state", "shown");
        letters[i].setAttribute("style", "color: red;");
        letters[i].textContent = letters[i].dataset.alpha;
      }
    }
  }

  redirect.setAttribute("style", "display: block;");
}

redirect.addEventListener("click", () => {
  location.href = "index.html";
});

redirect.setAttribute("style", "display: none;");

createKeyboard();
renderQuiz();
document.addEventListener("keydown", handleKeyDown);

const myGameLoop = setInterval(() => {
  if (success) {
    endOfGame = true;
  }

  if (!endOfGame) {
    var letters = document.querySelectorAll(".letter");

    for (var i = 0; i < letters.length; i++) {
      var alpha = letters[i].dataset.alpha;
      if (key === alpha) {
        letters[i].textContent = alpha;
        letters[i].setAttribute("data-state", "shown");
      }
    }

    var count = 0;

    for (var i = 0; i < letters.length; i++) {
      if (letters[i].dataset.state === "shown") {
        count++;
      }
    }

    if (count === letters.length) {
      success = true;
    }
  } else {
    gameOver();
  }
}, 100);
