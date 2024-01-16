// Assigning names to get elements from html to javascript on selected purpose for each element.
const mainContainerEL = document.getElementById("main-container");
const inputEL = document.getElementById("input");
const btnEL = document.getElementById("btn");
const qrCodeEL = document.getElementById("qr-code");
const qrImgEL = document.getElementById("qr-img");

// show the qr code of the typed url/text when the button is clicked.
btnEL.addEventListener('click', () => {
  let qrValue = inputEL.value;
  if (!qrValue) return;  // if the input is empty then return from here without checking for the scripts below.
  // getting a QR code of user entered value using the qrserver
  // api and passing the api returned img src to qrImgEL  
  qrImgEL.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  qrImgEL.addEventListener("load", () => {
 mainContainerEL.classList.add("active");
  })
});


//show the qr code of the typed url/text with Enter key after typing.
inputEL.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let qrValue = inputEL.value;
    if (!qrValue) return;  // if the input is empty then return from here without checking for the scripts below.
    // getting a QR code of user entered value using the qrserver
    // api and passing the api returned img src to qrImgEL
    qrImgEL.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImgEL.addEventListener("load", () => {
      mainContainerEL.classList.add("active");
    })
    
  }
});