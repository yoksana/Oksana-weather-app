currentTime = new Date();
console.log(currentTime);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayweek = days[currentTime.getDay()];

let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let curtime = document.querySelector("#timenow");
curtime.innerHTML = `${dayweek} ${hour}:${minute}`;

function showTemp(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  let temperatureRounded = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureRounded;
  let city = document.querySelector("#mycity");
  city.innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  console.log(response.data.main);
}
function searchCity(city) {
  let apiKey = "89b5d6145e65f229b79e3ab3372a1a19";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(cityUrl).then(showTemp);
}

function cityChange(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-text").value;
  searchCity(newCity);
}

let selectButton = document.querySelector("#search-form");
selectButton.addEventListener("submit", cityChange);

searchCity("Kyiv");

// Current temp section

function showPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "89b5d6145e65f229b79e3ab3372a1a19";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(geoUrl).then(showTemp);
}

function newcityChange(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let selectCurrent = document.querySelector("#current-location");
selectCurrent.addEventListener("click", newcityChange);
