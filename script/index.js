var loading = document.querySelector("#loading");
var start = document.querySelector("#start");

async function getDefinition(word) {
  const url = `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${word}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "1bb48e7c13msh5b2a276adf80c86p116e48jsn579d817ede67",
      "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
    },
  });

  const data = await response.json();

  for (var i = 0; i < Object.values(data.meaning).length; i++) {
    if (Object.values(data.meaning)[i]) {
      return Object.values(data.meaning)[i];
    }
  }
}

async function generateRandomWord() {
  const url = new URL(
    "https://twinword-word-association-quiz.p.rapidapi.com/type1/"
  );

  const params = new URLSearchParams({ level: 1, area: "ielts" });

  url.search = params;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "1bb48e7c13msh5b2a276adf80c86p116e48jsn579d817ede67",
      "X-RapidAPI-Host": "twinword-word-association-quiz.p.rapidapi.com",
    },
  });

  const data = await response.json();

  return data.quizlist[0].option[0];
}

function gererateWordMeaning() {
  var count = 0;

  start.disabled = true;
  loading.textContent = "Loading ";

  const myloading = setInterval(() => {
    loading.textContent += ".";
    count++;

    if (count === 5) {
      loading.textContent = "Loading ";
      count = 0;
    }
  }, 200);

  generateRandomWord().then((word) => {
    getDefinition(word).then((meaning) => {
      clearInterval(myloading);

      const wordMeaning = {
        word: word,
        meaning: meaning,
      };

      localStorage.setItem("wordMeaning", JSON.stringify(wordMeaning));
      location.href = "game.html";
    });
  });
}

start.addEventListener("click", gererateWordMeaning);
