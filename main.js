// Select Elements
const tabs = document.querySelectorAll(".tab");
const focusTab = document.getElementById("focus");
const shortBreakTab = document.getElementById("short-break");
const longBreakTab = document.getElementById("long-break");
const time = document.getElementById("time");
const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");
const resetBtn = document.getElementById("btn-reset");
// Declare Variables
let activeTab = "focus";
let setInt;
let minutesCount = 24;
let secondsCount = 59;
let paused = true;

// Display Time
time.textContent = `${minutesCount + 1}:00`;

// Append Zero When Number < 10
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

// Handle Switch Tab
const switchTab = (clickedTab, min) => {
  tabs.forEach((tab) => tab.classList.remove("active"));
  clickedTab.classList.add("active");
  minutesCount = min;
  secondsCount = 59;
  time.textContent = `${appendZero(minutesCount + 1)}:00`;
};

// Handle Focus Tab
focusTab.addEventListener("click", (e) => {
  document.documentElement.style.setProperty("--mainColor", "rgb(186, 73, 73)");
  activeTab = e.target.id;
  switchTab(e.target, 24);
  pauseTimer();
});

// Handle Short-Break Tab
shortBreakTab.addEventListener("click", (e) => {
  document.documentElement.style.setProperty(
    "--mainColor",
    "rgb(56, 133, 138)"
  );
  activeTab = e.target.id;
  switchTab(e.target, 4);
  pauseTimer();
});

// Handle Long-Break Tab
longBreakTab.addEventListener("click", (e) => {
  document.documentElement.style.setProperty(
    "--mainColor",
    "rgb(57, 112, 151)"
  );
  activeTab = e.target.id;
  switchTab(e.target, 14);
  pauseTimer();
});

// Handle Pause Btn
pauseBtn.addEventListener(
  "click",
  (pauseTimer = () => {
    document.getElementById("click").play();
    paused = true;
    clearInterval(setInt);
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
  })
);

// Handle Reset Btn
resetBtn.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();

    switch (activeTab) {
      case "focus":
        minutesCount = 24;
        break;
      case "long-break":
        minutesCount = 14;
        break;
      case "short-break":
        minutesCount = 4;
        break;
      default:
        minutesCount = 24;
        break;
    }
    secondsCount = 59;
    time.textContent = `${appendZero(minutesCount + 1)}:00`;
  })
);

// Handle Rang Bell
let playBell = () => document.getElementById(`${activeTab}-end`).play();

// Handle Start Btn
startBtn.addEventListener("click", () => {
  document.getElementById("click").play();
  resetBtn.classList.add("show");
  pauseBtn.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");

  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minutesCount)}:${appendZero(
      secondsCount
    )}`;

    setInt = setInterval(() => {
      secondsCount--;
      time.textContent = `${appendZero(minutesCount)}:${appendZero(
        secondsCount
      )}`;
      if (secondsCount == 0) {
        if (minutesCount != 0) {
          minutesCount--;
          secondsCount = 60;
        } else {
          clearInterval(setInt);
          playBell();
          pauseBtn.classList.remove("show");
          pauseBtn.classList.add("hide");
        }
      }
    }, 1000);
  }
});
