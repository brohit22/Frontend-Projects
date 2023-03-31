const timeDisplay = document.querySelector(".time-display");
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const resetBtn = document.querySelector("#reset-btn");

let startTime;
let elapsedTime = 0;
let timerInterval;
let isTimerRunning = false;

function startTimer() {
  if (!isTimerRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    isTimerRunning = true;
    startBtn.textContent = "Pause";
    startBtn.classList.toggle("btn-danger");
    playClickSound();
  } else {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startBtn.textContent = "Resume";
    startBtn.classList.toggle("btn-danger");
    playClickSound();
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    elapsedTime = Date.now() - startTime;
    startBtn.textContent = "Start";
    startBtn.classList.remove("btn-danger");
    playClickSound();
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  startBtn.textContent = "Start";
  startBtn.classList.remove("btn-danger");
  playClickSound();
}

function updateTimer() {
  const currentTime = Date.now();
  const timeElapsed = currentTime - startTime;
  const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((timeElapsed % 1000) / 10);
  const timeString = `${padZero(minutes)}:${padZero(seconds)}:${padZero(
    milliseconds
  )}`;
  timeDisplay.textContent = timeString;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function playClickSound() {
  const clickSound = document.querySelector("#click-sound");
  clickSound.currentTime = 0;
  clickSound.play();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
