let time = 25 * 60;
let timerInterval;
let distractions = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const distractBtn = document.getElementById("distractBtn");
const resetBtn = document.getElementById("resetBtn");
const distractionsDisplay = document.getElementById("distractions");

function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  timerDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    updateTimer();

    if (time <= 0) {
      clearInterval(timerInterval);
      alert("Фокус сесията приключи!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  time = 25 * 60;
  distractions = 0;
  distractionsDisplay.textContent = distractions;
  updateTimer();
}

function addDistraction() {
  distractions++;
  distractionsDisplay.textContent = distractions;

  document.body.style.background = "#7f1d1d";

  setTimeout(() => {
    document.body.style.background = "#0f172a";
  }, 300);
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
distractBtn.addEventListener("click", addDistraction);

updateTimer();