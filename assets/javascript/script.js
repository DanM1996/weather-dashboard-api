var citiesArr = [];
var fiveDayContainerEl = document.querySelector("#five-day-container");

var apiKey = "588cb54af9e39e64a535d1bc49b2842f";

function dailyWeather() {
    var searchCity = document.querySelector("#city-search").value;
    var oneDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey; 
    fetch(oneDayApi)
    .then(function(oneDay){
        return oneDay.json();
    })
    .then(function(oneDay){
        var cityName = oneDay.name;
        var currentTemp = "Current Temperature: " + parseInt((oneDay.main.temp) * 9/5 - 459) + "°F";
        var currentHumidity = "Humidity: " + oneDay.main.humidity + "%";
        var windSpeed = "Wind Speed: " + oneDay.wind.speed + " MPH";
        var showCity = document.querySelector("#cityName");
        var showDailyTemp = document.querySelector("#currentTemp");
        var showDailyHumidity = document.querySelector("#currentHumidity");
        var showDailyWind = document.querySelector("#currentWind");
        showCity.innerHTML = cityName;
        showDailyTemp.innerHTML = currentTemp;
        showDailyHumidity.innerHTML = currentHumidity;
        showDailyWind.innerHTML = windSpeed;

        var cityLat = oneDay.coord.lat;
        var cityLon = oneDay.coord.lon;

        fetch("https://api.openweathermap.org/data/2.5/onecall?appid="+ apiKey + "&lat=" + cityLat +"&lon=" + cityLon)

        .then(function(oneDayUVI){
            return oneDayUVI.json();
        })
        .then(function(oneDayUV){
            var uvIndex = "UV Index: " + oneDayUV.current.uvi;
            var showUV = document.querySelector("#currentUV");
            showUV.innerHTML = uvIndex;
        })
    })
    forecast();
}

function forecast() {
    var searchCity = document.querySelector("#city-search").value;
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + apiKey + "&units=metric";
    fetch(fiveDayApi)
    .then(function(fiveDay){
        return fiveDay.json();
    })
    .then(function(fiveDay){
        console.log(fiveDay.main.temp);
    })
    
}
    
