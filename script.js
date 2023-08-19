// Function for a Go Back button
function goBack(){
  history.back();
}


// Function to get location from the pop-up and pass it to the fetch weather function
function locationGetter() {
  const successCallback = (position) => {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    fetchWeather(lon,lat);
    // Open a new tab with the URL
    window.open('display.html', '_self');
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  if ("geolocation" in navigator) {
    // Check if geolocation is supported in the browser
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not available in this browser.");
  }
}


// This function will Use API and fetch weather, Temp , Humidity and ICON

function fetchWeather(lon, lat) {
  console.log(lon);
  console.log(lat);
  let key = '4f06c1ec33a58ad2fd12bb45f63f4235';
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((data) => {
    console.log(data);
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp-273.5;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;
    showWeather(weatherDescription,temperature,humidity,icon)
    })
    .catch(console.error);   
}





// function showWeather(weatherDescription, temperature, humidity, icon) 

function showWeather(weatherDescription, temperature, humidity, icon) {
  const weatherDescriptionElement = document.getElementById("weather-description");
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("Humidity");
  const iconElement = document.getElementById("icon");

  weatherDescriptionElement.textContent = weatherDescription;
  temperatureElement.textContent = temperature.toFixed(2); // Format temperature to two decimal places
  humidityElement.textContent = humidity;
  // Set the icon source
  iconElement.src = `images/${icon}.svg`; 
}





// // This is for the to get COUNTRY NAME IF USER TYPE IT MANUALLY
// document.addEventListener("DOMContentLoaded", function() {
//   var kc= document.getElementById("countryInput");
//   kc.addEventListener("keydown",(event) => {
//     if (event.key === "Enter") {
//       window.open("display.html");
//       var country = document.getElementById("countryInput").value;
//       console.log(country);
//     }
//   });
// });





