document.addEventListener('DOMContentLoaded', () => {
  const noteContainerEL = document.querySelector(".note-container");
  const btnEL = document.querySelector(".btn");

  function showNotes() {
    const storedNotes = localStorage.getItem("notes");
    noteContainerEL.innerHTML = storedNotes || "";
  }

  showNotes();

  function updateStorage() {
    localStorage.setItem('notes', noteContainerEL.innerHTML);
  }

  btnEL.addEventListener('click', () => {
    let inputBox = document.createElement("div");
    let inputField = document.createElement("input");
    let icon = document.createElement("i");

    inputBox.className = "input-box";
    inputField.setAttribute("type", "text");
    icon.className = "ri-delete-bin-2-line";

    inputBox.appendChild(inputField);
    inputBox.appendChild(icon);

    noteContainerEL.appendChild(inputBox);

    // Focus on the newly created input field
    inputField.focus();
  });

  noteContainerEL.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName === "I") {
      const inputBox = target.parentElement;
      const inputField = inputBox.querySelector("inputBox");

      if (inputField) {
        inputField.value = ""; // Clear the text inside the input
        updateStorage();
      }
    } else if (target.tagName == "INPUT") {
      target.addEventListener('input', function () {
        updateStorage();
      });
    }
  });

  // Event listener for beforeunload to ensure data is saved before leaving the page
  window.addEventListener('beforeunload', () => {
    updateStorage();
  });
});