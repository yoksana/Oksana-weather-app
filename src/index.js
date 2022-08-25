let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function checkTime(time) {
  let mytime = new Date(time);
  let dayweek = days[mytime.getDay()];
  let hour = mytime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = mytime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${dayweek} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  console.log(date);
  let daynum = date.getDay();
  let names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"];
  let dateformat = names[daynum];
  return dateformat;
}
function weekForecast(weekday) {
  let data = weekday.data.daily;
  console.log(data);
  let forecast = document.querySelector("#weekfcst");

  let forecastHTML = "";
  data.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <div class = "fcst-date">${formatDay(day.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" width="70px"  alt=""/>        
              <div class="fcst-temp">
                <span class="fcst-temp-max">${Math.round(day.temp.max)}°</span>
                <span class="fcst-temp-min">${Math.round(day.temp.min)}°</span>
              </div>
            </div>
  `;
    }
  });
  forecast.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  let apiKey = "89b5d6145e65f229b79e3ab3372a1a19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weekForecast);
}

function showTemp(response) {
  let temperature = document.querySelector("#temp");
  let city = document.querySelector("#mycity");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  let time = document.querySelector("#timenow");

  celsius = response.data.main.temp;
  let temperatureRounded = Math.round(celsius);
  temperature.innerHTML = temperatureRounded;
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}m/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  time.innerHTML = checkTime(response.data.dt * 1000);
  getforecast(response.data.coord);
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

let celsius = null;
let selectButton = document.querySelector("#search-form");
selectButton.addEventListener("submit", cityChange);

searchCity("Kyiv");

function showWeathericon(event) {
  event.preventDefault;
  let weatherAPI = "";
  let icon = document.querySelector("#weather-icon");
}
