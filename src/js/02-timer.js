import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let choosenDate = 0;
let dateFromFuture = false;
let diffTime = 0;
let intervalId = null;

const options = {
  dateFormat: 'd-m-Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 5,
  locale: Ukrainian,
  onClose(selectedDates) {
    choosenDate = selectedDates[0];
    diffTime = choosenDate - new Date();
    dateFromFuture = diffTime > 0;
    if (!dateFromFuture) {
      refs.btnStart.disabled = true;
      showWarning();
      repaintTimerVal(0);
      return;
    }

    repaintTimerVal(diffTime);
    refs.btnStart.disabled = false;
  },
};

refs.btnStart.disabled = true;
const fp = flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', onBtnStartHandler);

function onBtnStartHandler(e) {
  if (refs.choosenDate < new Date()) {
    showWarning();
    repaintTimerVal(0);
    return;
  }

  intervalId = setInterval(timerCount, 1000);
  fp.destroy();
  refs.btnStart.disabled = true;
}

function timerCount() {
  const difference = choosenDate - new Date();

  if (difference <= 1000) {
    clearInterval(intervalId);
  }
  repaintTimerVal(difference);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function repaintTimerVal(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function showWarning() {
  Notify.failure('Please choose a date in the future', {
    timeout: 3000,
  });
}

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const inputEl = document.querySelector('#datetime-picker');
// const btnEl = document.querySelector('button[data-start]');
// const secondsEl = document.querySelector('span[data-seconds]');
// const minutesEl = document.querySelector('span[data-minutes]');
// const hoursEl = document.querySelector('span[data-hours]');
// const daysEl = document.querySelector('span[data-days]');

// btnEl.setAttribute(`disabled`, true);
// btnEl.addEventListener('click', onStartTimer);
// let choosingDate = null;
// let timerId = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     onChoiceValidDate(selectedDates[0]);
//   },
// };

// function onChoiceValidDate(selectedDates) {
//   choosingDate = selectedDates.getTime();
//   if (selectedDates < Date.now()) {
//     Notify.failure('Please choose a date in the future');
//   }

//   if (selectedDates >= Date.now()) {
//     btnEl.removeAttribute('disabled');
//   }
// }

// function onStartTimer() {
//   timerId = setInterval(startTimer, 1000);
//   btnEl.setAttribute(`disabled`, true);
//   inputEl.setAttribute(`disabled`, true);
// }

// function startTimer() {
//   const differentDate = choosingDate - Date.now();
//   const formatDate = convertMs(differentDate);
//   renderDate(formatDate);
//   if (secondsEl.textContent === '00' && minutesEl.textContent === '00') {
//     Notify.success('Time end');
//     clearInterval(timerId);
//   }
// }

// function renderDate({ days, hours, minutes, seconds }) {
//   secondsEl.textContent = addLeadingZero(seconds);
//   minutesEl.textContent = addLeadingZero(minutes);
//   hoursEl.textContent = addLeadingZero(hours);
//   daysEl.textContent = addLeadingZero(days);
// }

// flatpickr(inputEl, options);

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// import '../css/common.css';

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   stopBtn: document.querySelector('button[data-action-stop]'),
//   clockface: document.querySelector('[datetime-picker]'),
// };

// class Timer {
//   constructor({ onTick }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;

//     this.init();
//   }

//   init() {
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }

//   start() {
//     if (this.isActive) {
//       return;
//     }

//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = this.getTimeComponents(deltaTime);

//       this.onTick(time);
//     }, 1000);
//   }

//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }

//   /*
//    * - Принимает время в миллисекундах
//    * - Высчитывает сколько в них вмещается часов/минут/секунд
//    * - Возвращает обьект со свойствами hours, mins, secs
//    * - Адская копипаста со стека 💩
//    */
//   getTimeComponents(time) {
//     const hours = this.pad(
//       Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     );
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

//     return { hours, mins, secs };
//   }

//   /*
//    * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
//    */
//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
// }

// const timer = new Timer({
//   onTick: updateClockface,
// });

// refs.startBtn.addEventListener('click', timer.start.bind(timer));
// refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

// /*
//  * - Принимает время в миллисекундах
//  * - Высчитывает сколько в них вмещается часов/минут/секунд
//  * - Рисует интерфейс
//  */
// function updateClockface({ hours, mins, secs }) {
//   refs.clockface.textContent = `${hours}:${mins}:${secs}`;
// }
