const SESSION_TIME = 25 * 60;
let time = SESSION_TIME;
let timerInterval = null;
let isRunning = false;

let blacklist = JSON.parse(localStorage.getItem("blacklist")) || [];

const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("status");

const siteInput = document.getElementById("siteInput");
const addSiteBtn = document.getElementById("addSiteBtn");
const blacklistUI = document.getElementById("blacklist");
const simulateBtn = document.getElementById("simulateBtn");
const alertSound = document.getElementById("alertSound");

function updateUI() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const progress = (time / SESSION_TIME) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  statusText.textContent = "Focus shield activated.";

  timerInterval = setInterval(() => {
    time--;
    updateUI();

    if (time <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      statusText.textContent = "Mission complete. Focus session finished.";
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  statusText.textContent = "Session paused.";
}

function resetTimer() {
  clearInterval(timerInterval);
  time = SESSION_TIME;
  isRunning = false;
  statusText.textContent = "Ready to protect your focus.";
  updateUI();
}

function addSite() {
  const value = siteInput.value.trim();

  if (!value) return;

  blacklist.push(value);
  localStorage.setItem("blacklist", JSON.stringify(blacklist));

  siteInput.value = "";
  renderBlacklist();
}

function renderBlacklist() {
  blacklistUI.innerHTML = "";

  blacklist.forEach((site, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "10px";
    li.style.background = "#1e293b";
    li.style.padding = "12px";
    li.style.borderRadius = "12px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";

    li.innerHTML = `
      <span>${site}</span>
      <button onclick="removeSite(${index})" style="background:#dc2626; color:white; border:none; padding:6px 10px; border-radius:8px;">X</button>
    `;

    blacklistUI.appendChild(li);
  });
}

function removeSite(index) {
  blacklist.splice(index, 1);
  localStorage.setItem("blacklist", JSON.stringify(blacklist));
  renderBlacklist();
}

function simulateDistraction() {
  document.body.classList.add("alert-mode");
  statusText.textContent = "⚠ DISTRACTION DETECTED — Return to work immediately!";
  alertSound.play();

  setTimeout(() => {
    document.body.classList.remove("alert-mode");
    statusText.textContent = "Focus restored.";
  }, 4000);
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
addSiteBtn.addEventListener("click", addSite);
simulateBtn.addEventListener("click", simulateDistraction);

updateUI();
renderBlacklist();