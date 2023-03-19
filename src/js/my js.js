import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let countdownInterval; // змінна для зберігання ID інтервалу зворотнього відліку
// функція для оновлення таймера
function updateTimer() {
  const currentDate = new Date(); // поточна дата
  const targetDate = new Date(dateInput.value); // кінцева дата
  const totalSeconds = (targetDate - currentDate) / 1000; // розраховуємо загальну кількість секунд до кінцевої дати
  if (totalSeconds <= 0) {
    // якщо час вийшов, зупиняємо таймер
    clearInterval(countdownInterval);
    return;
  }
  const days = Math.floor(totalSeconds / 3600 / 24); // розраховуємо кількість днів
  const hours = Math.floor(totalSeconds / 3600) % 24; // розраховуємо кількість годин
  const minutes = Math.floor(totalSeconds / 60) % 60; // розраховуємо кількість хвилин
  const seconds = Math.floor(totalSeconds) % 60; // розраховуємо кількість секунд
  // виводимо значення на екран
  daysEl.textContent = days < 10 ? `0${days}` : days;
  hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
  minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
}
// функція для запуску таймера
function startTimer() {
  clearInterval(countdownInterval); // очищуємо попередній інтервал, якщо він був запущений
  countdownInterval = setInterval(updateTimer, 1000); // запускаємо інтервал зворотнього відліку
}
// додаємо обробник події на кнопку запуску таймера
startBtn.addEventListener('click', startTimer);
// ініціалізуємо бібліотеку flatpickr на полі вибору дати
flatpickr(dateInput, options);
// Елементи інтерфейсу
const dateInput = document.querySelector('#date-selector');
const startBtn = document.querySelector('#start-btn');
const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
// додаємо обробник події на кнопку запуску таймера
startBtn.addEventListener('click', startTimer);
// Функція форматування числа з додаванням ведучих нулів
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
// Функція оновлення таймера
function updateTimer(endDate) {
  const remainingTime = endDate - new Date().getTime(); // Різниця між кінцевою датою і поточною датою в мілісекундах
  if (remainingTime < 0) {
    // Якщо користувач вибрав дату в минулому
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  if (remainingTime === 0) {
    // Якщо досягнуто кінцевої дати
    clearInterval(timerInterval);
    Notiflix.Notify.success('The timer has ended');
    startBtn.disabled = true;
  }
}
// Функція запуску таймера
function startTimer(endDate) {
  updateTimer(endDate); // Оновлення таймера перед запуском
  const timerInterval = setInterval(() => {
    updateTimer(endDate);
  }, 1000);
  return timerInterval;
}
// Функція обробки закриття вікна вибору дати
function onDateSelect(selectedDates) {
  const selectedDate = selectedDates[0];
  startBtn.disabled = false; // Активація кнопки «Start»
  startBtn.addEventListener('click', () => {
    startTimer(selectedDate.getTime());
  });
}
// Функція підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
// Ініціалізація вибору дати
flatpickr(dateInput, {
  minDate: 'today',
  dateFormat: 'd-m-Y',
  onClose: onDateSelect,
});
// Ініціалізація бібліотеки повідомлень
Notiflix.Notify.init({
  position: 'right-top',
  distance: '10px',
  fontSize: '14px',
  timeout: 3000,
});

// const timer = document.querySelector('.timer'); // отримуємо блок таймера
// const daysEl = timer.querySelector('.days'); // отримуємо елемент виводу днів
// const hoursEl = timer.querySelector('.hours'); // отримуємо елемент виводу годин
// const minutesEl = timer.querySelector('.minutes'); // отримуємо елемент виводу хвилин
// const secondsEl = timer.querySelector('.seconds'); // отримуємо елемент виводу секунд
// const startBtn = document.querySelector('.start-btn'); // отримуємо кнопку запуску таймера
// const dateInput = document.querySelector('#datetime-picker'); // отримуємо поле вибору дати
