var apiKey = "588cb54af9e39e64a535d1bc49b2842f";


function dailyWeather() {
    var searchCity = document.querySelector("#city-search").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var currentTemp = parseInt((response.main.temp) * 9/5 - 459);
        var currentHumidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        // var uvIndex = response.current.uvi;
        console.log(currentTemp, currentHumidity, windSpeed);
    })
}
