const btnEl = document.getElementById("btn");
const quoteEL = document.getElementById("quote");
const authorEL = document.getElementById("author");


btnEl.addEventListener("click", getQuote);

async function getQuote() {

  try {
    
        // rename the button and show loading text
    btnEl.innerText = "Loading...";
    btnEl.disabled = true;
    quoteEL.innerText = "Please wait...";
    authorEL.innerText = "Updating...";

    // Make a request to the API
    const url = "https://api.quotable.io/random";
    const data = await fetch(url).then((res) => res.json());

    // Update the elements with the existing quote and author
    quoteEL.innerText = data.content;
    authorEL.innerText = "~ " + data.author;
    // rename the button to it initial text
    btnEl.innerText = "GET A QUOTE";
    btnEl.disabled = false;
    
  } catch (error) {
    // Handle any errors
    quoteEL.innerText = "An error occurred.";
    authorEL.innerText = error.message;
    btnEl.disabled = false;
  }
}


getQuote();
