var gameCard = document.querySelector("#gameCard");
var timer = document.querySelector("#timer");
var hint = document.querySelector("#hint");

var timeLeft = 30;
var endOfGame = false;
var index = 0;
var success = false;

const wordMeaning = JSON.parse(localStorage.getItem("wordMeaning"));

const myTimer = setInterval(() => {
  if (timeLeft > 0) {
    timer.textContent = `Time Left: ${timeLeft}`;
    timeLeft--;
  } else {
    timer.textContent = "Time is up!";
    clearInterval(myTimer);
    endOfGame = true;
  }
}, 1000);

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

  document.addEventListener("keydown", (event) => {
    var key = event.key.toUpperCase();
    var letters = document.querySelectorAll(".letter");

    for (var i = 0; i < letters.length; i++) {
      var alpha = letters[i].dataset.alpha;
      if (key === alpha) {
        letters[i].textContent = alpha;
        letters[i].setAttribute("data-state", "shown");
      }
    }
  });
}

renderQuiz();

const myGameLoop = setInterval(() => {
  if (success) {
    endOfGame = true;
  }

  if (!endOfGame) {
    var letters = document.querySelectorAll(".letter");
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
    if (success) {
      hint.textContent = "You get it!";
    } else {
      hint.textContent = "Game over!";
    }
    clearInterval(myTimer);
    clearInterval(myGameLoop);
  }
}, 200);
