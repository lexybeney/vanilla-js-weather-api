// import modules
import { updateInterface, printError } from "./htmlCreator.js";

// DOM references
const searchLocation = document.getElementById("searchLocation");

// Get user location coords with browser geolocation API
navigator.geolocation.getCurrentPosition(
  (location) => {
    getWeatherData(location.coords.latitude, location.coords.longitude);
  },
  (error) => {
    console.log(error);
    printError(error);
  }
);

// Use location coords to get weather information from third-party API
async function getWeatherData(latitude, longitude) {
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&units=metric&appid=b6877a79366a3f016b75f846e2c979a1`
  );
  const currentIcon = `https://openweathermap.org/img/wn/${weatherData.data.current.weather[0].icon}@2x.png`;
  getLocationFromCoords(latitude, longitude, weatherData, currentIcon);
}

// Use coords to get town from third-party API and update interface with this data
async function getLocationFromCoords(
  latitude,
  longitude,
  weatherData,
  currentIcon
) {
  const location = await axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=b6877a79366a3f016b75f846e2c979a1`
  );
  updateInterface(
    location.data[0].name,
    weatherData.data,
    latitude,
    longitude,
    currentIcon
  );
}

// User input location sent to third-party API to get coords
async function getLocationFromPlace(userInput) {
  try {
    const coords = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=b6877a79366a3f016b75f846e2c979a1`
    );
    getWeatherData(coords.data[0].lat, coords.data[0].lon);
  } catch (error) {
    let html = `<p>That doesn't look quite right, please try again.</p>`;
    document.getElementById("error").innerHTML = html;
  }
}

searchLocation.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputData = new FormData(searchLocation);
  const inputEntry = Object.fromEntries(inputData);
  getLocationFromPlace(inputEntry.search);
});
