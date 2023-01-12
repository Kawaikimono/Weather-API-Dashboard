// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// // You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the 

// var weatherApi = '91f70ee705cc15ae38e8e5bf4ba00fb0'
// var mapApi = 'uhySqA3yJUAq3ZktI21f2ZlbCFSwQUh3'
var btn = document.querySelector('.btn');
var city = document.querySelector('#city');

function getWeatherApi() { 
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91f70ee705cc15ae38e8e5bf4ba00fb0`;
  console.log(weatherUrl)
    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      })
    }
var lat = ""
var lon = ""

function getMapApi() {
      var mapUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=uhySqA3yJUAq3ZktI21f2ZlbCFSwQUh3&location=${city.value}`
      console.log(mapUrl)
      fetch(mapUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.results[0].locations[0])
          lat = data.results[0].locations[0].displayLatLng.lat
          lon = data.results[0].locations[0].displayLatLng.lng
          getWeatherApi()
        })
      }
      
btn.addEventListener("click", function(){
      getMapApi()
})
  
      
