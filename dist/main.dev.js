"use strict";

// DOM Elements
var time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'); // Options

var showAmPm = true; // Show Time

function showTime() {
  var today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds(); // Set AM or PM

  var amPm = hour >= 12 ? 'PM' : 'AM'; // 12hr Format

  hour = hour % 12 || 12; // Output Time

  time.innerHTML = "".concat(hour, "<span>:</span>").concat(addZero(min), "<span>:</span>").concat(addZero(sec), " ").concat(showAmPm ? amPm : '');
  setTimeout(showTime, 1000);
} // Add Zeros


function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
} // Set Background and Greeting


function setBgGreet() {
  var today = new Date(),
      hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
} // Get Name


function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
} // Set Name


function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
} // Get Focus


function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
} // Set Focus


function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus); // Run

showTime();
setBgGreet();
getName();
getFocus();

function getWeather() {
  var url, res, data;
  return regeneratorRuntime.async(function getWeather$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city.textContent, "&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric");
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json());

        case 6:
          data = _context.sent;
          weatherIcon.className = 'weather-icon owf';
          weatherIcon.classList.add("owf-".concat(data.weather[0].id));
          temperature.textContent = "".concat(data.main.temp.toFixed(0), "\xB0C");
          weatherDescription.textContent = data.weather[0].description;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);