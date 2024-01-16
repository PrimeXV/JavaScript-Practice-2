const btnEL = document.getElementById("btn");
const nameEL = document.getElementById("name");

const emoji = [];

// Function to get random emoji
async function getEmoji() {
  try {
    let response = await fetch("https://emoji-api.com/emojis?access_key=65c5b09e10c9e9ec94bcfeeac28157e69a23a637");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data);

    for (let i = 0; i < 1500; i++) {
      emoji.push({
        emojiName: data[i].character,
        emojiCode: data[i].subGroup,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call of the function getEmoji
getEmoji();

// Adding clickable functionality to the button with instruction on what it is desired to perform
btnEL.addEventListener('click', () => {
  if (navigator.onLine && emoji.length > 0) {
    const randomNum = Math.floor(Math.random() * emoji.length);
    btnEL.innerText = emoji[randomNum].emojiName;
    nameEL.innerText = emoji[randomNum].emojiCode;
  } else {
    btnEL.innerText = "An error occurred, please try again in few seconds";
  
    nameEL.innerText = "error";
  }
});
