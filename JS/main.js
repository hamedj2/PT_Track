import Timer from './timer.js';

const timeRemainingDisplay = document.getElementById('time-remaining');
const timeInput = document.getElementById('time-input');
const startButton = document.getElementById('timer-start');
const timer = new Timer();
const timerDisplay = document.querySelector('.timer-display');
const audio = new Audio('alarm.mp3'); // Add this line

// Start timer when start button is clicked
startButton.addEventListener('click', () => {
  const duration = parseInt(timeInput.value);
  if (!isNaN(duration) && duration > 0) {
    timer.start(duration);
    updateDisplay();
  }
});

// Define the SVG path element and maximum stroke-dashoffset based on the rounded rectangle's circumference
const path = document.querySelector('.timer-ring__path');
const circumference = 2 * Math.PI * 100; // Assuming the radius is 100 and corner radius is 20
path.setAttribute('d', `M 125 25 a 100 100 0 1 0 0 200 a 100 100 0 1 0 0 -200`); // Path data for rounded rectangle
path.style.strokeDasharray = circumference;
path.style.strokeDashoffset = circumference;

// Update the timer display every second
function updateDisplay() {
  const time = timer.getTime();
  const offset = circumference - (time / timer.startingSeconds) * circumference;
  path.style.strokeDashoffset = offset;
  timeRemainingDisplay.textContent = formatTime(time);

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
  audio.play();
  timerDisplay.classList.add('flash-border');
  setTimeout(() => timerDisplay.classList.remove('flash-border'), 3000); // Removes the class after flashing
};