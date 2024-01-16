const inputEL = document.getElementById("input");
const searchEL = document.getElementById("search");
const locationEL = document.getElementById("location");
const boxEL = document.getElementById("box");
const forecastContainerEL = document.getElementById("forecast-container");



const API_KEY = "7a2f3f440959bd923078891ff5d57650"; // API key for OpenWeather API

const createWeatherCard = (cityName, weatherItem, index) => {

  if (index === 0) { // HTML for the main weather card
    return `<div class="details">
  <h1>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h1>
  <p class="temperature">Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</p>
<p class="wind">wind: ${weatherItem.wind.speed}M/S</p >
<p class="humidity">Humidity: ${weatherItem.main.humidity}%</p>
</div>

<div class="icon">
  <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather image">
  <p class="weather-name">${weatherItem.weather[0].description}</p>
</div>`;

  } else { // HTML for the other five day forecast card
    return ` <div class="forecast">

  <h4 class="name-date">(${weatherItem.dt_txt.split(" ")[0]})</h4>
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather image">
  <p class="temperature">Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</p>
  <p class="wind">wind: ${weatherItem.wind.speed}M/S</p >
  <p class="humidity">Humidity: ${weatherItem.main.humidity}%</p>

</div>`;
  }

}



function getWeatherDetails(cityName, lat, lon) {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then(res => res.json())
    .then(data => {


      // Filter the forecasts to get only one forecast per day
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });

      //Clearing previous weather data
      inputEL.value = "";
      boxEL.innerHTML = "";
      forecastContainerEL.innerHTML = "";

      // Creating weather cards and adding them to the DOM
      fiveDaysForecast.forEach((weatherItem, index) => {
        if (index === 0) {
          boxEL.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem.index));
        } else {
          forecastContainerEL.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem.index));
        }

      });
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast!");
    });

}



function getCityCoordinates() {

  const cityName = inputEL.value.trim(); //Get user entered city name and remove extra spaces
  if (!cityName) return; //Return if cityName is empty

  const GEOCODING_API_weatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;


  // Get entered city coordinates (latitude, longitude, and name) from the API response
  fetch(GEOCODING_API_weatherURL)
    .then(res => res.json())
    .then(data => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching the coordinates!");
    });
}



const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const REVERSE_GEOCODING_API_weatherURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;


      // Get city name from coordinate using reverse geocoding API
      fetch(REVERSE_GEOCODING_API_weatherURL)
      .then(res => res.json())
      .then(data => {

        const { name } = data[0];
        getWeatherDetails(name, latitude, longitude);
      })
      .catch(() => {
        alert("An error occurred while fetching the city!");
      });
  
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("geolocation request denied. Please reset location permission to grant access again.");
      }

    }

  );
}



locationEL.addEventListener('click', getUserCoordinates);

inputEL.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
    getCityCoordinates();
  }
});


searchEL.addEventListener('click', getCityCoordinates);



