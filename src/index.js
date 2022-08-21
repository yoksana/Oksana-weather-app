currentTime = new Date();

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
  let temperature = document.querySelector("#temp");
  let city = document.querySelector("#mycity");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsius = response.data.main.temp;
  let temperatureRounded = Math.round(celsius);
  temperature.innerHTML = temperatureRounded;
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  icon.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
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

function farChange(event) {
  event.preventDefault();
  let showUnit = document.querySelector("#temp");
  let far = celsius * (9 / 5) + 32;
  showUnit.innerHTML = Math.round(far);
}
function celChange(event) {
  event.preventDefault();
  let showUnit = document.querySelector("#temp");
  showUnit.innerHTML = Math.round(celsius);
}

let celsius = null;
let selectButton = document.querySelector("#search-form");
selectButton.addEventListener("submit", cityChange);

searchCity("Kyiv");

let selectFar = document.querySelector("#fahrenheit");
selectFar.addEventListener("click", farChange);

let selectCel = document.querySelector("#celsius");
selectCel.addEventListener("click", celChange);

function showWeathericon(event) {
  event.preventDefault;
  let weatherAPI = "";
  let icon = document.querySelector("#weather-icon");
}
