function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day}, ${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°`;
  let newCity = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${newCity}`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].main}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let currentDay = document.querySelector("#day-time");
currentDay.innerHTML = formatDate(response.data.dt * 1000); 
  
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`
  let sunrise = document.querySelector("#sunrise-time");
  sunrise.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  let sunset = document.querySelector("#sunset-time");
  sunset.innerHTML = formatTime(response.data.sys.sunset * 1000);

  celciusTemperature = response.data.main.temp; 
}

function showForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
       <div class="col-2 text-center forecast">
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          <p> ${formatTime(forecast.dt * 1000)}
           </br>
          <strong> ${Math.round(forecast.main.temp_max)}º</strong>
           | ${Math.round(forecast.main.temp_min)}º
          </p>
      </div>       
      `;
  }
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `d8f001fd84ae14313a7e46b613ac8c97`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}





function search(city) {
  let apiKey = "d8f001fd84ae14313a7e46b613ac8c97";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-search-input");
 search(inputCity.value);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature*9)/5+32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(farenheitTemperature)}°`;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}°`;
}


let iconElement = document.querySelector("#weather-icon");

let fahrenheitLink = document.querySelector("#fahrenheit-selector");
fahrenheitLink.addEventListener("click", convertToFarenheit);
let celciusTemperature = null;
let celciusLink = document.querySelector("#celcius-selector");
celciusLink.addEventListener("click", convertToCelcius);


let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);



search("London");