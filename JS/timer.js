// Timer logic
class Timer {
    constructor() {
      this.intervalId = null;
      this.remainingSeconds = 0;
      this.isRunning = false;
    }
  
    // Initialize the timer with a specific duration in seconds
    start(duration) {
      if (this.isRunning) {
        return;
      }
      
      this.remainingSeconds = duration;
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.remainingSeconds -= 1;
        if (this.remainingSeconds <= 0) {
          this.complete();
        }
        // Here we will later implement the callback to update the frontend
      }, 1000);
    }
  
    // Stops the timer
    stop() {
      if (!this.isRunning) {
        return;
      }
  
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
    }
  
    // Completes the timer countdown
    complete() {
      this.stop();
      // Here we will later implement the callback for timer completion
    }
  
    // Retrieves the current remaining time
    getTime() {
      return this.remainingSeconds;
    }
  }
  
  export default Timer;
  