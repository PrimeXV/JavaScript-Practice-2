const ratingELs = document.querySelectorAll(".rating");
const btnEL = document.getElementById("btn");

const containerEl = document.getElementById("container");


let selectedRating = "";

ratingELs.forEach((rating) => {
  rating.addEventListener('click', (event) => {
   removeActive();
   selectedRating = event.target.innerText || event.target.parentNode.innerText;
   event.target.classList.add("active");
   event.target.parentNode.classList.add("active");
  });
});


btnEL.addEventListener('click', () => {
  if (selectedRating !== "") {
   containerEl.innerHTML = `
   <strong>Thank you!</strong>
   <br>
   <br>
   <strong>Feedback: ${selectedRating}</strong>
   <p>We'll use your feedback to improve our customer support.</p>
   `
  }
});


function removeActive() {
  ratingELs.forEach((rating) => {
    rating.classList.remove("active");    
  });
}