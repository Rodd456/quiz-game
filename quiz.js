var questions = [
  {
    question: "What NBA team did Lebron James play for? ",
    choices: ["Bucks", "Heat", "Spurs"],
    correctAnswer: 1
  },
  {
    question: "How many days are there in a year? ",
    choices: ["364", "365", "366"],
    correctAnswer: 1
  },
  {
    question: "What is the capital of Georgia?",
    choices: ["Woodstock", "Roswell", "Atlanta"],
    correctAnswer: 2
  }
];

var currentQuestion = 0;
var timeLimit = 20; // time limit in seconds
var timeLeft = timeLimit;
var timer;

function startQuiz() {
  // clear the quiz and response sections
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("response").innerHTML = "";

  // display the time left
  document.getElementById("timer").innerHTML = "Time left: " + timeLeft + " seconds";

  // set the timer interval to update every second
  timer = setInterval(updateTimer, 1000);

  // load the first question
  loadQuestion();
}


function loadQuestion() {
  // Get the current question object from the 'questions' array
  var q = questions[currentQuestion];

  // Build the HTML string to display the question and answer choices
  var questionHtml = "<h2>" + q.question + "</h2>";
  for (var i = 0; i < q.choices.length; i++) {
    questionHtml += "<button onclick='checkAnswer(" + i + ")'>" + q.choices[i] + "</button>";
  }

  // Set the HTML content of the 'quiz' element to the questionHtml string
  document.getElementById("quiz").innerHTML = questionHtml;
}

// This function checks if the answer provided by the user is correct or incorrect,
// updates the response message and adds points if the answer is correct.
function checkAnswer(answer) {
  // Check if the answer is correct and update the response message accordingly
  const isAnswerCorrect = questions[currentQuestion].correctAnswer === answer;
  const response = isAnswerCorrect ? "Correct!" : "Incorrect!";
  // Add points if the answer is correct
  timeLeft = isAnswerCorrect ? timeLeft + 5 : timeLeft;
  // Move on to the next question
  currentQuestion++;
  
  // Get the elements that will be updated
  const responseElement = document.getElementById("response");
  const quizElement = document.getElementById("quiz");
  const timerElement = document.getElementById("timer");

  // Update the response message
  const responseString = `<p>${response}</p>`;
  responseElement.innerHTML = responseString;

  // Check if the quiz is completed
  if (currentQuestion >= questions.length) {
    // Stop the timer and clear the quiz
    clearInterval(timer);
    timerElement.innerHTML = "";
    quizElement.innerHTML = "";
    // Display the final score
    const scoreString = `Quiz completed! Your score is: ${timeLeft} seconds`;
    responseElement.innerHTML = scoreString;
    // Store the score in local storage
    const storedScores = JSON.parse(localStorage.getItem("scores")) || [];
    storedScores.push(timeLeft);
    localStorage.setItem("scores", JSON.stringify(storedScores));
  } else {
    // Load the next question
    loadQuestion();
  }
}

function updateTimer() {
  timeLeft--; // decrease the time left by 1 second
  if (timeLeft > 0) { // if there's still time left
    // update the timer element with the remaining time
    document.getElementById("timer").innerHTML = "Time left: " + timeLeft + " seconds";
  } else {
    clearInterval(timer); // stop the timer
    // hide the timer and quiz elements
    document.getElementById("timer").innerHTML = "";
    document.getElementById("quiz").innerHTML = "";
    // display the user's score
    document.getElementById("response").innerHTML = "Quiz completed! Your score is: " + timeLeft + " seconds";
    // store the score in local storage
    var storedScores = localStorage.getItem("scores");
    var scores = storedScores ? JSON.parse(storedScores) : []; // if there are existing scores, parse them from JSON; otherwise, start with an empty array
    scores.push(timeLeft); // add the user's score to the array
    localStorage.setItem("scores", JSON.stringify(scores)); // store the updated array in local storage
  }
}
