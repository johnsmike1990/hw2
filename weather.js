let getWeather = function(latitude, longitude) {
  // let latitude = '41.8781';
  // let longitude = '-87.6298';
  // Note to professor - I commented out the Chicago hardcoding
  let displayError = function(error) {
    console.debug(error);
    window.alert("Sorry, something went wrong.");
  }

  navigator.geolocation.getCurrentPosition(function(location) {
    console.log("Latitude is " + location.coords.latitude);
    console.log("Longitude is " + location.coords.longitude);

    let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
    openweathermap_api_url += 'lat=' + location.coords.latitude
    openweathermap_api_url += '&lon=' + location.coords.longitude
    openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

    fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
  });
}

let convertToJSON = function(response) {
  return response.json();
}

let updateWeather = function(dataFromService) {
  console.debug(dataFromService)
  city = dataFromService.name;
  temperature = dataFromService.main.temp;
  icon = dataFromService.weather[0].icon;
  let location = document.getElementById("location");
  location.innerHTML = "You're in " + city;
  let weather = document.getElementById("temp_reading");
  weather.innerHTML = "It is " + temperature + " degrees outside.";
  document.getElementById("weather_icon").src="http://openweathermap.org/img/w/"+ icon +".png";
}

let weatherLink = document.getElementById("get_forecast")
weatherLink.addEventListener("click", getWeather);

console.debug("Some text here");
