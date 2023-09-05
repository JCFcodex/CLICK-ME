//This file is not mine; I just made some enhancements to the code. I added a timer and changed the button's color.
//CREDITS TO THE OWNER

const button = document.querySelector("button");
const refreshLink = document.getElementById("restart");
const timerDuration = 20; // 20 seconds
let timerInterval;

refreshLink.addEventListener("click", function (event) {
  // Prevent the default behavior of the link (prevents it from navigating to a different page)
  event.preventDefault();

  // Reload (refresh) the page
  location.reload();
});

const calculateDistance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

document.addEventListener("mousemove", (event) => {
  const radius = Math.max(
    button.offsetWidth * 0.75,
    button.offsetHeight * 0.75,
    100
  );

  const bx =
    button.parentNode.offsetLeft + button.offsetLeft + button.offsetWidth / 2;
  const by =
    button.parentNode.offsetTop + button.offsetTop + button.offsetHeight / 2;

  const dist = calculateDistance(event.clientX, event.clientY, bx, by);
  const angle = Math.atan2(event.clientY - by, event.clientX - bx);

  const ox = -Math.cos(angle) * Math.max(radius - dist, 0);
  const oy = -Math.sin(angle) * Math.max(radius - dist, 0);

  const rx = oy / 2;
  const ry = -ox / 2;

  button.style.transition = "all 0.1s ease";
  button.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  button.style.boxShadow = `0px ${Math.abs(oy)}px ${
    (Math.abs(oy) / radius) * 40
  }px rgba(0,0,0,0.15)`;
});

const displayMessage = (message) => {
  button.textContent = message;
};

const handleButtonClick = () => {
  clearInterval(timerInterval); // Stop the timer when the button is clicked
  displayMessage("You win 🎉🙃");
  button.style.backgroundColor = "#99fc8a";
};

const handleButtonKeyDown = (event) => {
  event.preventDefault();
  displayMessage("No cheating 🙅‍♂️");
  button.style.backgroundColor = "#f7ac5b";
};

button.addEventListener("click", handleButtonClick);
button.addEventListener("keydown", handleButtonKeyDown);
button.click = handleButtonClick;

if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
  displayMessage("This thing doesn't work with touch 😢");
}

window.addEventListener("touchstart", () => {
  displayMessage("This thing doesn't work with touch 😢");
});

// Timer logic
let timer = timerDuration;
const timerDisplay = document.createElement("div");
timerDisplay.classList.add("timer");
document.body.appendChild(timerDisplay);

const updateTimerDisplay = () => {
  timerDisplay.textContent = `Time left: ${timer} seconds`;
};

updateTimerDisplay();

timerInterval = setInterval(() => {
  timer--;
  updateTimerDisplay();

  if (timer === 0) {
    clearInterval(timerInterval);
    displayMessage("Time is up ⏰");
    button.disabled = true;
    button.style.backgroundColor = "#fc8a8a";
  }
  if (timer === 5) {
    timerDisplay.style.color = "red";
  }
}, 1000);
