var TemperatureType = "C";

var IDThunderstorm = [
  200,
  201,
  202,
  210,
  211,
  212,
  221,
  230,
  231,
  232
];
var IDDrizzle = [
  300,
  301,
  302,
  310,
  311,
  312,
  313,
  314,
  321
];
var IDRain = [
  500,
  501,
  502,
  503,
  504,
  511,
  520,
  521,
  522,
  531
];
var IDSnow = [
  600,
  601,
  602,
  611,
  612,
  613,
  615,
  616,
  620,
  621,
  622
];
var IDAtmosphere = [
  701,
  711,
  721,
  731,
  741,
  751,
  761,
  762,
  771,
  781
];
var IDClear = [
  800
];
var IDClouds = [
  801,
  802,
  803,
  804
];


window.onload = function () {
  let btn = document.getElementById("btn-submit");
  btn.addEventListener("click", City, true);
  let fara = document.getElementsByClassName("fahrenheit")[0];
  fara.addEventListener("click", temperatureF);
  let cels = document.getElementsByClassName("celsius")[0];
  cels.addEventListener("click", celsiusss);
  let btngeo = document.getElementById("btn-gps");
  btngeo.addEventListener("click", positionbygeo);
  dateya();
  dayta();
  timeday();
};

function City(event) {
  event.preventDefault();
  let input = document.querySelector("#inputCity1");
  console.log(input.value);
  let city1 = document.getElementsByClassName("weather-location");
  city1[0].innerHTML = input.value;
  let apiKey = "cddcdbeb0d8ae256f1f13853924685e8";
  let cityname = document.querySelector("#inputCity1").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(temperature);
}


function temperature(response) {
  let tem = document.getElementById("tempo");
  let sky = document.querySelector("#sky");
  let skydes = response.data.weather[0].description;
  var skyUpper = skydes.substring(0, 1).toUpperCase();
  skydes = skyUpper + skydes.substring(1, skydes.length)
  sky.innerHTML = skydes;
  let tempa = response.data.main.temp;
  tem.innerHTML = tempa;
  this.selectImageForWeather(response.data);
  this.DescriptionOfWeather(response.data);
  this.getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) 
    {
    forecastHTML = forecastHTML + `<div class="col-2">
                                <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
                                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="70">
                                <div class="weather-forecast-temperatures">
                                    <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                                    <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                                </div>
                                <br>
                            </div>`;
  }});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function DescriptionOfWeather(response) {
  let element = document.getElementById("WindandOther");
  let wind = response.wind.speed;
  let speed = (wind * 3.6).toFixed(1);
  let humidity = document.getElementById("humidity");
  let percent = response.main.humidity;
  let feelsLike = document.getElementById("FeelsLike");
  let feelsLikeC = response.main.feels_like.toFixed(1);
  let feelslikeF = ((feelsLikeC * 9) / 5 + 32).toFixed(1);
  feelsLike.innerHTML =
    "Feels like: " + feelsLikeC + "°C " + "or  " + feelslikeF + "°F";
  humidity.innerHTML = "Humidity: " + percent + " %";
  element.innerHTML = "Wind speed: " + speed + " km/h";
}

function positionbygeo() {
  navigator.geolocation.getCurrentPosition(geotemp);
}

function geotemp(position) {
  let apiKey = "cddcdbeb0d8ae256f1f13853924685e8";
  let lati = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(geotemperature);
}

function geotemperature(response) {
  let geom = document.getElementById("tempo");
  let gtem = response.data.main.temp;
  let namm = document.querySelector(".weather-location");
  let resman = response.data.name;
  let sky = document.querySelector("#sky");
  let skydes = response.data.weather[0].description;
  var skyUpper = skydes.substring(0, 1).toUpperCase();
  skydes = skyUpper + skydes.substring(1, skydes.length)
  sky.innerHTML = skydes;
  namm.innerHTML = resman;
  geom.innerHTML = gtem;
  var el = document.querySelector(".bg-image");
  this.selectImageForWeather(response.data);
  this.DescriptionOfWeather(response.data);
  this. getForecast(response.data.coord);
}

function selectImageForWeather(weatherData) {
  if (IDClouds.includes(weatherData.weather[0].id)) {
    var el = document.querySelector(".bg-image");
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://jooinn.com/images/rain-clouds-5.jpg)"
  }
  if (IDClear.includes(weatherData.weather[0].id)) {
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://wallpapercave.com/wp/wp6289040.jpg)"
  }
  if (IDDrizzle.includes(weatherData.weather[0].id)) {
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://pluviophile.net/wp-content/uploads/rain-on-a-green-windowpain-wallpaper.jpg)"
  }
  if (IDRain.includes(weatherData.weather[0].id)) {
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://i.ytimg.com/vi/CqKQsQfE3Mw/maxresdefault.jpg)"
  }
  if (IDThunderstorm.includes(weatherData.weather[0].id)) {
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fdb3825a6-9744-11e8-85e3-d844d3177259.jpg?crop=4608%2C2592%2C0%2C240&resize=1180)"
  }
  if (IDSnow.includes(weatherData.weather[0].id)) {
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/winter/footprints-in-the-snow.jpg)"
  }
  if (IDAtmosphere.includes(weatherData.weather[0].id)) {
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(https://i.pinimg.com/originals/26/be/b0/26beb09153b8df233d82e66bef3edfbb.jpg)"
  }
}

function dayta() {
  var today = new Date();
  var date = today.getDate();
  var months = today.getMonth();
  var monthslist = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Augus",
    "September",
    "October",
    "November",
    "December"
  ];
  let daydate = document.querySelector(".weather-date");
  daydate.innerHTML = date + " " + monthslist[months];
}



function dateya() {
  var today = new Date();
  var day = today.getDay();
  var daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let datedata = document.querySelector(".Curday");
  datedata.innerHTML = daylist[day];
}

function timeday() {
  var today = new Date();
  var hour = today.getHours();
  var minute = today.getMinutes();
  console.log("Current Time : " + hour + " : " + minute);
  let curtime = document.querySelector(".time");
  curtime.innerText = hour + ":" + minute;
}

function temperatureF(event) {
  event.preventDefault();
  if (TemperatureType === "C") {
    let cels = document.getElementById("tempo");
    let fahrenheit = (cels.innerText * (9 / 5) + 32).toFixed(1);
    cels.innerHTML = fahrenheit;
    TemperatureType = "F";
  }
}

function celsiusss(event) {
  event.preventDefault();
  if (TemperatureType === "F") {
    let fahra = document.getElementById("tempo");
    let celsius = ((fahra.innerText - 32) * (5 / 9)).toFixed(1);
    fahra.innerHTML = celsius;
    TemperatureType = "C";
  }
}


