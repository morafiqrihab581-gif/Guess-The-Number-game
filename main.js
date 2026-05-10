const input = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const historyDisplay = document.getElementById("history");

let secretNumber;
let attemptsLeft = 10;
let guessHistory = [];

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    guessHistory = [];

    attemptsDisplay.textContent = attemptsLeft;
    historyDisplay.textContent = "No guesses yet.";
    message.textContent = "";

    input.disabled = false;
    submitButton.disabled = false;

    restartButton.style.display = "none";

    input.value = "";
    input.focus();
}

function checkGuess() {

    if (input.value === "") {
        message.textContent =
            "Please enter a number.";
        return;
    }

    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent =
            "Enter a valid number between 1 and 100.";
        return;
    }

    if (guessHistory.includes(guess)) {
        message.textContent =
            `You already guessed ${guess}.`;
        return;
    }

    guessHistory.push(guess);

    historyDisplay.textContent = guessHistory.join(", ");

    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    let feedback = `You guessed ${guess}. `;

    if (guess === secretNumber) {

        feedback += `🎉 Correct! The number was ${secretNumber}.`;
        endGame();

    } else if (attemptsLeft === 0) {

        feedback += `💀 Game Over! The number was ${secretNumber}.`;
        endGame();

    } else if (guess < secretNumber) {

        feedback += "📉 Too low!";

    } else {

        feedback += "📈 Too high!";
    }

    message.textContent = feedback;

    input.value = "";
    input.focus();
}

function endGame() {
    input.disabled = true;
    submitButton.disabled = true;
    restartButton.style.display = "inline-block";
}

submitButton.addEventListener("click", checkGuess);

restartButton.addEventListener("click", startGame);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkGuess();
    }
});

startGame();
