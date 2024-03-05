// Timer logic
class Timer {
  constructor() {
      this.intervalId = null;
      this.remainingSeconds = 0;
      this.isRunning = false;
      this.startingSeconds = 0; // Track the initial time
      this.onTick = null; // Callback for each tick
      this.onComplete = null; // Callback for completion
  }

  start(duration) {
      if (this.isRunning) {
          return;
      }

      this.remainingSeconds = duration;
      this.startingSeconds = duration; // Set the starting time
      this.isRunning = true;
      this.intervalId = setInterval(() => {
          this.remainingSeconds -= 1;
          if (this.remainingSeconds <= 0) {
              this.complete();
          }

          if (this.onTick) {
              this.onTick(); // Call the onTick callback each second
          }
      }, 1000);
  }

  stop() {
      if (!this.isRunning) {
          return;
      }

      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
  }

  complete() {
      this.stop();
      if (this.onComplete) {
          this.onComplete(); // Call the onComplete callback
      }
  }

  getTime() {
      return this.remainingSeconds;
  }
}

export default Timer;
