const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function startChangeColor() {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(changeBodyColor, 1000);
  startBtn.disabled = true;
}

function stopChangeColor() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
}
