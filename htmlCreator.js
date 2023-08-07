export const updateInterface = (
  location,
  data,
  latitude,
  longitude,
  currentIcon
) => {
  //create timestamps for sunrise and sunset
  const sunrise = new Date(data.current.sunrise * 1000).toLocaleTimeString(
    undefined,
    { timeStyle: "short" }
  );
  const sunset = new Date(data.current.sunset * 1000).toLocaleTimeString(
    undefined,
    { timeStyle: "short" }
  );

  // current day weather
  let html = `<h1>${location}</h1>
              <h2 class="today">Today</h2>
        <div class="currentDetails">
          <div class="currentFirst">
          <h2 class="currentTemp" >${Math.round(data.current.temp)}&deg;</h2>
            <img class="currentIcon" src=${currentIcon} />
          </div>
          <p class="currentDescription">${
            data.current.weather[0].description
          }</p>
        </div>
        <div class="extraDetails">
             <div class="currentHigh">
                <p>max</p>
                <p>${Math.round(data.daily[0].temp.max)} &deg;</p>
             </div>
             <div class="currentLow">
                <p>min</p>
                <p>${Math.round(data.daily[0].temp.min)} &deg;</p>
             </div>
             <div class="sunrise">
                <p>sunrise</p>
                <p>${sunrise}</p>
             </div>
             <div class="sunset">
                <p>sunset</p>
                <p>${sunset}</p>
             </div>
        </div>`;

  document.getElementById("location").innerHTML = html;
  document.getElementById("error").innerHTML = "";
  document.getElementById("loading").innerHTML = "";
  document.getElementById("loading").style.height = "0px";

  // next 7 days forecast
  let forecast = data.daily;
  let htmlForecast = "";

  document.getElementById("forecastTitle").innerHTML = "Next 7 days";
  const sevenDays = forecast.splice(1, 7);

  for (const day of sevenDays) {
    htmlForecast += generateForecast(day);
    document.getElementById("forecastDays").innerHTML = htmlForecast;
  }
};

export const generateForecast = (day) => {
  const forecastDay = new Date(day.dt * 1000);
  const dateEnd = dateOrdinal(forecastDay.getDate());

  function dateOrdinal(d) {
    return d == 31 || d == 21 || d == 1
      ? "st"
      : d == 22 || d == 2
      ? "nd"
      : d == 23 || d == 3
      ? "rd"
      : "th";
  }

  const formattedDate = forecastDay.toLocaleDateString("en-GB", {
    day: "numeric",
    weekday: "short",
  });

  return `<div id=${day.dt}><h3>${formattedDate}${dateEnd}</h3>
  <img src=https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png />
  <p><strong>${Math.round(day.temp.max)} &deg;</strong> ${Math.round(
    day.temp.min
  )} &deg;</p>
            </div>`;
};

export const printError = (error) => {
  let errorMessage = `<h2 class="noLocation">Your location could not be found, please try searching for a city instead.</h2>`;

  document.getElementById("loading").innerHTML += errorMessage;
  document.getElementById("error").innerHTML = "";
  document.getElementById("sevenDayTitle").innerHTML = "";
  document.getElementById("spinner").style.display = "none";
};
