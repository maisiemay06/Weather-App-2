import axios from "axios";

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = `d8f001fd84ae14313a7e46b613ac8c97`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°`;
  let newCity = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${newCity}`;
}

function search(city) {
  let apiKey = "d8f001fd84ae14313a7e46b613ac8c97";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-search-input");
  let inputCityName = inputCity.value;
  let apiKey = "d8f001fd84ae14313a7e46b613ac8c97";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}
function changeToCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = "15°";
}
function changeToFarenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = "59°";
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

let celciusSelector = document.querySelector("#celcius-selector");
celciusSelector.addEventListener("click", changeToCelcius);

let farenheitSelector = document.querySelector("#farenheit-selector");
farenheitSelector.addEventListener("click", changeToFarenheit);

let currentDay = document.querySelector("#day-time");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
currentDay.innerHTML = `${day}, ${hours}:${minutes}`;

search("London");
