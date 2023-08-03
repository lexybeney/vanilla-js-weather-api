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
        <div class="currentDetails">
          <h2 class="currentTemp" >${Math.round(data.current.temp)}&deg;</h2>
          <p class="currentDescription">${
            data.current.weather[0].description
          }</p>
          <img class="currentIcon" src=${currentIcon} />
          <div class="">
             <p class="currentHigh" >max ${Math.round(
               data.daily[0].temp.max
             )} &deg; 
             </p>
             <p class="currentLow"> min ${Math.round(
               data.daily[0].temp.min
             )} &deg;
             </p>
             <p class="sunrise"> ${sunrise}
             </p>
             <p class="sunset"> ${sunset}
             </p>
          </div>
        </div>`;

  // let map = `<iframe
  //     width="270"
  //     height="280"
  //     frameborder="0"
  //     src="https://www.bing.com/maps/embed?h=400&w=500&cp=${latitude}~${longitude}&lvl=12.371139810340651&typ=d&sty=r&src=SHELL&FORM=MBEDV8"
  //     scrolling="no"
  //   >
  //   </iframe>`;

  document.getElementById("location").innerHTML = html;
  document.getElementById("error").innerHTML = "";
  // document.getElementById("map").innerHTML = map;

  // next 6 days forecast
  let forecast = data.daily;
  let htmlForecast = "";

  const sevenDays = forecast.splice(1, 7);
  htmlForecast += `<h2 id="sevenDayTitle">The next seven days</h2>`;
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
  let errorMessage = `<h2>Your location could not be found, please try searching for a city instead.</h2>`;
  let forecasetTitle = "";

  document.getElementById("location").innerHTML = errorMessage;
  document.getElementById("error").innerHTML = "";
  document.getElementById("sevenDayTitle").innerHTML = "";
};
