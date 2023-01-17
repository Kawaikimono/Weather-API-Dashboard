// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// // You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the 

var btn = document.querySelector('.btn');
var cityField = document.querySelector('#city');
var cityTitle = document.querySelector("#city-title")
var weatherCards = document.querySelector("#weather-containers")
var cityButtons = document.querySelector("#city-button")
var city
var country

function getWeatherApi(lat,lon,createNewButton) { 
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91f70ee705cc15ae38e8e5bf4ba00fb0&units=imperial`;
  console.log(weatherUrl)
    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderMe(data, createNewButton)
  
      })
    }

function renderMe(data, createNewButton) {
        weatherCards.innerHTML="";
        for (let i = 0; i <40 ; i+=8) {
          var newWeatherCard = document.createElement("section")
          var dateLine = document.createElement("h4")
          var weatherIconSpot = document.createElement("img")
          var weatherDescription = document.createElement("h4")
          var tempLine = document.createElement("h4")
          var windsLine = document.createElement("h4")
          var humidityLine = document.createElement("h4")
          
          dateLine.textContent = `Date: ${data.list[i].dt_txt}`
          weatherIconSpot.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
          weatherIconSpot.alt = "weather icon"
          tempLine.textContent = `Temp: ${data.list[i].main.temp} F`
          weatherDescription.textContent = `${data.list[i].weather[0].description}`
          windsLine.textContent = `Winds: ${data.list[i].wind.speed} MPH`
          humidityLine.textContent = `Humidity: ${data.list[i].main.humidity}%`
          
          newWeatherCard.append(dateLine);
          newWeatherCard.append(weatherIconSpot);
          newWeatherCard.append(weatherDescription);
          newWeatherCard.append(tempLine);
          newWeatherCard.append(windsLine);
          newWeatherCard.append(humidityLine);
          weatherCards.append(newWeatherCard)

          city = data.city.name
          country = data.city.country
          cityTitle.textContent=`${city}, ${country}`

        } 
        if(createNewButton)
        {
          createButton()
        }
      }
      
      function createButton (){
        var citybtn = document.createElement("button")
        citybtn.innerHTML = `${city},${country}`
        citybtn.classList.add("cuteBtn");
        cityButtons.appendChild(citybtn);
        citybtn.addEventListener("click", function (){
          getMapApi(this.innerHTML, false)
        })
        
        // save to local storage
        // call from local storage
      }


function getMapApi(cityName, iShouldcreateNewButton) {
      var mapUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=uhySqA3yJUAq3ZktI21f2ZlbCFSwQUh3&location=${cityName}`
      console.log(mapUrl)
      fetch(mapUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.results[0].locations[0])
          var lat = data.results[0].locations[0].latLng.lat
          var lon = data.results[0].locations[0].latLng.lng
          getWeatherApi(lat,lon,iShouldcreateNewButton)
        })
      }
      
btn.addEventListener("click", function(){
  event.preventDefault()
  getMapApi(cityField.value, true)
  cityField.value=""
})
  
      
