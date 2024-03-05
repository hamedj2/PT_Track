import Timer from './timer.js';

const timerDisplay = document.getElementById('time-remaining');
const timeInput = document.getElementById('time-input');
const startButton = document.getElementById('timer-start');
const timer = new Timer();

// Start timer when start button is clicked
startButton.addEventListener('click', () => {
  const duration = parseInt(timeInput.value);
  if (!isNaN(duration) && duration > 0) {
    timer.start(duration);
    updateDisplay();
  }
});

// Update the timer display every second
function updateDisplay() {
  timerDisplay.textContent = formatTime(timer.getTime());
  if (timer.isRunning) {
    setTimeout(updateDisplay, 1000);
  }
}

// Format time in seconds into MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Callback to update the display when the timer ticks
timer.onTick = updateDisplay;

// Callback for when the timer completes
timer.onComplete = () => {
  timerDisplay.textContent = "00:00";
  alert("Time's up!");
};
