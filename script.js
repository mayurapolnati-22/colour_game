// Color options
const colors = [
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#008000" },
  { name: "Blue", value: "#0000ff" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Orange", value: "#ffa500" },
  { name: "Purple", value: "#800080" },
  { name: "Pink", value: "#ffc0cb" },
  { name: "Brown", value: "#a52a2a" },
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#808080" }
];

const totalQuestions = 10;

let currentQuestion = 0;
let score = 0;
let correctColor = null;
let answered = false;
let questionColors = [];

// HTML elements
const colorName = document.getElementById("colorName");
const colorButtons = document.getElementById("colorButtons");
const message = document.getElementById("message");
const scoreElement = document.getElementById("score");
const questionCount = document.getElementById("questionCount");
const nextBtn = document.getElementById("nextBtn");
const gameContainer = document.querySelector(".game-container");
const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// Shuffle an array without repeating elements
function shuffleArray(array) {
  const copiedArray = [...array];

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = copiedArray[i];
    copiedArray[i] = copiedArray[randomIndex];
    copiedArray[randomIndex] = temp;
  }

  return copiedArray;
}

// Start or restart the game
function startGame() {
  currentQuestion = 0;
  score = 0;
  scoreElement.textContent = "Score: 0";
  resultScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  nextBtn.style.display = "none";

  // Select 10 unique colors for 10 questions
  questionColors = shuffleArray(colors).slice(0, totalQuestions);

  showQuestion();
}

// Display one question
function showQuestion() {
  answered = false;
  message.textContent = "";
  message.className = "";
  nextBtn.style.display = "none";

  questionCount.textContent = `Question: ${currentQuestion + 1} / ${totalQuestions}`;

  // Correct color for this question
  correctColor = questionColors[currentQuestion];
  colorName.textContent = correctColor.name;

  // Get 3 wrong colors that are not the correct color
  const wrongColors = colors.filter(
    color => color.name !== correctColor.name
  );

  const selectedWrongColors = shuffleArray(wrongColors).slice(0, 3);

  // Combine correct and wrong colors
  const options = [correctColor, ...selectedWrongColors];

  // Shuffle the four options
  const shuffledOptions = shuffleArray(options);

  // Remove old buttons
  colorButtons.innerHTML = "";

  // Create four color buttons
  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.className = "color-btn";
    button.style.backgroundColor = option.value;
    button.dataset.colorName = option.name;

    button.addEventListener("click", checkAnswer);
    colorButtons.appendChild(button);
  });
}

// Check selected answer
function checkAnswer(event) {
  if (answered) {
    return;
  }

  answered = true;

  const selectedColor = event.target.dataset.colorName;

  if (selectedColor === correctColor.name) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    message.textContent = "Correct! ✅";
    message.className = "correct";
  } else {
    message.textContent = `Incorrect! Correct answer is ${correctColor.name}. ❌`;
    message.className = "wrong";
  }

  nextBtn.style.display = "inline-block";
}

// Move to next question or show final score
nextBtn.addEventListener("click", function () {
  currentQuestion++;

  if (currentQuestion < totalQuestions) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show final result
function showResult() {
  gameContainer.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = `Your final score is ${score} out of ${totalQuestions}.`;
}

// Restart game
restartBtn.addEventListener("click", startGame);

// Start game when page loads
startGame();