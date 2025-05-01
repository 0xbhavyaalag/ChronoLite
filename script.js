// DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Stopwatch variables
let startTime;
let elapsedTime = 0;
let timeInterval;
let isRunning = false;
let lapCount = 1;

// Format time to display with leading zeros
function formatTime(time) {
    return time.toString().padStart(2, '0');
}

// Update display
function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Start the stopwatch
function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timeInterval = setInterval(updateDisplay, 10);
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
}

// Pause the stopwatch
function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timeInterval);
        elapsedTime += Date.now() - startTime;
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
}

// Reset the stopwatch
function reset() {
    isRunning = false;
    clearInterval(timeInterval);
    elapsedTime = 0;
    startTime = Date.now();
    updateDisplay();
    lapList.innerHTML = '';
    lapCount = 1;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
}

// Record lap time
function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        lapList.insertBefore(lapTime, lapList.firstChild);
        lapCount++;
    }
}

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initial setup
pauseBtn.style.display = 'none'; 