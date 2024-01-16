let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let int = null;


document.getElementById("start").addEventListener('click', () => {
   if (int !== null) {
      clearInterval(int);
   }
   int = setInterval(displayTimer, 10);
});


document.getElementById("pause").addEventListener('click', () => {
   clearInterval(int);
});


document.getElementById("reset").addEventListener('click', () => {
   clearInterval(int);

   milliseconds = 0;
   seconds = 0;
   minutes = 0;
   hours = 0;

   displayTimer();
});

function displayTimer() {
   milliseconds += 10;
   if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds >= 60) {
         seconds = 0;
         minutes++;
         if (minutes >= 60) {
            minutes = 0;
            hours++;
         }
      }
   }

   let h = hours < 10 ? "0" + hours : hours;
   let m = minutes < 10 ? "0" + minutes : minutes;
   let s = seconds < 10 ? "0" + seconds : seconds;
   let ms = milliseconds === 0 ? "00" : milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

   document.getElementById("hour").innerText = h;
   document.getElementById("min").innerText = m;
   document.getElementById("sec").innerText = s;
   document.getElementById("milisec").innerText = ms;


}