// Retrieve scores from local storage
const storedScores = localStorage.getItem("scores");

let scores = [];
if (storedScores) {
// Parse the scores from the stored string
scores = JSON.parse(storedScores);
}

// Get the element
const list = document.getElementById("scores");

// Append the scores to the element
for (let i = 0; i < scores.length; i++) {
const item = document.createElement("li");
item.textContent = scores[i];
list.appendChild(item);
}

// Function to clear scores
function clearScores() {
// Remove scores from local storage
localStorage.removeItem("scores");

// Clear the scores from the list element
const list = document.getElementById("scores");
list.innerHTML = "";

// Clear console
console.clear();
}

// Add event listener to clear button to clear scores
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearScores);

// Add event listener to clear button to clear session storage
clearButton.addEventListener("click", function() {
sessionStorage.clear();

// Clear the scores from the list element
const list = document.getElementById("scores");
while (list.firstChild) {
list.removeChild(list.firstChild);
}
});