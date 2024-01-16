const btnEL = document.getElementById("btn");
const animeContainerEL = document.getElementById("anime-container");
const animePicEL = document.getElementById("anime-pic");
const characterEL = document.getElementById("character");


btnEL.addEventListener('click', async function () {
  try {
    btnEL.disabled = true;
    btnEL.innerText = "Loading...";
    animePicEL.src = "spinner.svg";
    characterEL.innerText = "updating...";




    const response = await fetch("https://api.catboys.com/img");
    const data = await response.json();
    console.log(data);

    btnEL.disabled = false;
    btnEL.innerText = "Get Anime";
    animeContainerEL.style.display = "block";
    animePicEL = data.url;
    characterEL = data.artist;
  } catch (error) {
    btnEL.disabled = false;
    btnEL.innerText = "Get Anime"
    characterEL.innerText = "An error occurred, please try again later.";
  }

});