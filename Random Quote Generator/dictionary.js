const inputEL = document.getElementById("input");
const infoTextEL = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEL = document.getElementById("title");
const meaningEL = document.getElementById("meaning");
const audioEl = document.getElementById("audio");



async function fetchAPI(word) {
  try {
    infoTextEL.style.display = "block";
    meaningContainerEl.style.display = "none";

    infoTextEL.innerText = `Search the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());


    if (result.title) {
      infoTextEL.style.display = "none";
      meaningContainerEl.style.display = "block";
      titleEL.innerText = word;
      meaningEL.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEL.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEL.innerText = result[0].word;
      meaningEL.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    infoTextEL.innerText = "an error occurred, try again later";
  }
}


inputEL.addEventListener("keyup", (event) => {
  if (event.target && event.key === 'Enter') {
    fetchAPI(event.target.value);
    // meaningEL.style.display = 'block';
  }
});