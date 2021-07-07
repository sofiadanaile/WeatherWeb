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
}

function selectImageForWeather(weatherData) {
  if (IDClouds.includes(weatherData.weather[0].id)) {
    alert('CloudsIMAGE');
  }
  if (IDClear.includes(weatherData.weather[0].id)) {
    alert('ClearIMAGE');
  }
  if (IDDrizzle.includes(weatherData.weather[0].id)) {
    alert('DrizzleIMAGE');
  }
  if (IDRain.includes(weatherData.weather[0].id)) {
    alert('RAINIMAGE');
  }
  if (IDThunderstorm.includes(weatherData.weather[0].id)) {
    alert('ThunderstormIMAGE');
  }
  if (IDSnow.includes(weatherData.weather[0].id)) {
    alert('SNOWIMAGE');
  }
  if (IDAtmosphere.includes(weatherData.weather[0].id)) {
    alert('ATMOSPHEREIMAGE');
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