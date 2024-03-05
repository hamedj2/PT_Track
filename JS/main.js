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

// Define the SVG circle element and maximum stroke-dashoffset based on the circle's circumference
const circle = document.querySelector('.timer-ring__circle');
const maxOffset = circle.getTotalLength(); // Assuming the radius is 100, as set in the SVG attributes
// Add these at the top of your main.js
const audio = new Audio('path_to_your_audio_file.mp3');
const circumference = circle.r.baseVal.value * 2 * Math.PI;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;


circle.style.strokeDasharray = maxOffset;
circle.style.strokeDashoffset = maxOffset;

// Update the timer display every second
function updateDisplay() {
  const time = timer.getTime();
  const offset = circumference - (time / timer.startingSeconds) * circumference;
  circle.style.strokeDashoffset = offset;
  timerDisplay.textContent = formatTime(time);

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
  circle.classList.add('complete');
  setTimeout(() => circle.classList.remove('complete'), 2000); // Removes the class after flashing
};
