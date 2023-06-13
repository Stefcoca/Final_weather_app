const timeinfo = document.getElementById('time-info');
const cityinfo = document.getElementById('city-name');
const iconinfo = document.getElementById('icon');
const weatherinfo = document.getElementById('weatherInformation');
const descriptioninfo = document.getElementById('description');
const humedityinfo = document.getElementById('dayweather');
const airinfo = document.getElementById('airspeed');
const farenheitinfo = document.getElementById('farenheit')



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const apikey= 'ce144f0cf51fa43f03431f0488a36728';

setInterval(() => {
  const time = new Date();
  const day =time.getDay();
  const hour = time.getHours();
  const hourin12format = hour >=13? hour %12:hour;
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM';
  const selectday = days[day];
  const fulltime = selectday+ ' ' +(hourin12format < 10? '0'+hourin12format : hourin12format) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + (ampm);
    timeinfo.innerHTML = fulltime;
}, 1000);


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
console.log(forecast)
  let forecastElement = document.querySelector("#TemperatureDay");

  let forecastHTML = `<div class="row" id="informationCard">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-3">
                <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" id="secondIcon">
            </div>
            <div class="col-3">
                <span id="WeekDay">${formatDay(forecastDay.dt)}</span>
            </div>
            <div class="col-3" id="RealTemperature">
                <span id="celsiudTemp">${Math.round(forecastDay.temp.day)}</span>°
            </div>
            <div class="col-3" id="convertion">
                <span id="farenheitTemperature">${(Math.round((forecastDay.temp.day)*9/5)+32)}</span>°
            </div>
             `;
               }   
              });

              forecastHTML = forecastHTML + `</div>`;
              forecastElement.innerHTML = forecastHTML;
            }


function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}



function getweatherdata (city){
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`).then(res=>res.json()).then(data =>{
    cityinfo.innerHTML=(data.name);
    showWeatherData(data)})
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#busqueda");
  getweatherdata(city.value);
}

function showWeatherData(data){
  weatherinfo.innerHTML=(Math.round(data.main.temp))+'°';
  descriptioninfo.innerHTML =(data.weather[0].description)
    humedityinfo.innerHTML =(data.main.humidity);
    airinfo.innerHTML=(data.wind.speed);
    farenheitinfo.innerHTML=Math.round(((data.main.temp)*9/5)+32);
    
    let iconcode = (data.weather[0].icon);
    iconinfo.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconcode}@2x.png`
    )
    getForecast(data.coord)
}


let form = document.querySelector("#search-button");
form.addEventListener("click", handleSubmit);

let submitform = document.querySelector("#form-search");
submitform.addEventListener('submit',handleSubmit);

getweatherdata("tegucigalpa")

