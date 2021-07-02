if (localStorage.getItem("cities")) {
    var searchedCities = JSON.parse(localStorage.getItem("cities"));
    renderCities();
} else {
    var searchedCities = [];
}
var cityList = document.getElementById("city-list");
var fiveDayContainerEl = document.querySelector("#five-day-container");
var forecastDay1 = document.querySelector("#day-one");
var forecastDay2 = document.querySelector("#day-two");
var forecastDay3 = document.querySelector("#day-three");
var forecastDay4 = document.querySelector("#day-four");
var forecastDay5 = document.querySelector("#day-five");
var cityButtons = document.querySelector(".city");

cityList.addEventListener("click", function(event){
    console.log(event.target.id); 
    dailyWeather(searchedCities[event.target.id])
 });

var apiKey = "588cb54af9e39e64a535d1bc49b2842f";

function dailyWeather(searchPlace) {
    var searchCity = document.querySelector("#city-search").value;
    if (searchPlace){
        var oneDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchPlace + "&appid=" + apiKey + "&units=imperial";  
    } else {
    var oneDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial"; 
    searchedCities.push(searchCity);
    localStorage.setItem("cities", JSON.stringify(searchedCities));
    }
    fetch(oneDayApi)
    .then(function(oneDay){
        return oneDay.json();
    })
    .then(function(oneDay){
        var cityName = oneDay.name + moment().format(" (M/D/Y)");
        var currentTemp = "Current Temperature: " + (oneDay.main.temp) + "°F";
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

        // logging the lat and lon of the city entered for uv index data
        var cityLat = oneDay.coord.lat;
        var cityLon = oneDay.coord.lon;

        // seperate api to capture UV Index data
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
    // call forecast function after the first day finishes
    forecast(searchPlace);
    renderCities();
}

function forecast(searchPlace) {
    if (searchPlace){
        var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchPlace + "&appid=" + apiKey + "&units=imperial"; 
    } else {
    var searchCity = document.querySelector("#city-search").value;
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";
    }
    fetch(fiveDayApi)
    .then(function(fiveDay){
        return fiveDay.json();
    })
    .then(function(fiveDay){
        
        // create variables to log the data of temp, humidity, and wind speed for 5 days
        var day1Temp = "Temp: " + fiveDay.list[1].main.temp;
        var day1Humidity = " Humitidy: " + fiveDay.list[1].main.humidity
        var day1Wind = " Wind Speed: " + fiveDay.list[1].wind.speed; 
        var day2Temp = "Temp: " + fiveDay.list[2].main.temp;
        var day2Humidity = " Humitidy: " + fiveDay.list[2].main.humidity
        var day2Wind = " Wind Speed: " + fiveDay.list[2].wind.speed;
        var day3Temp = "Temp: " + fiveDay.list[3].main.temp;
        var day3Humidity = " Humitidy: " + fiveDay.list[3].main.humidity
        var day3Wind = " Wind Speed: " + fiveDay.list[3].wind.speed;
        var day4Temp = "Temp: " + fiveDay.list[4].main.temp;
        var day4Humidity = " Humitidy: " + fiveDay.list[4].main.humidity
        var day4Wind = " Wind Speed: " + fiveDay.list[4].wind.speed;
        var day5Temp = "Temp: " + fiveDay.list[5].main.temp;
        var day5Humidity = " Humitidy: " + fiveDay.list[5].main.humidity
        var day5Wind = " Wind Speed: " + fiveDay.list[5].wind.speed;

        // display the 5 day forecast in the HTML
        forecastDay1.innerHTML = day1Temp + day1Humidity + day1Wind;
        forecastDay2.innerHTML = day2Temp + day2Humidity + day2Wind;
        forecastDay3.innerHTML = day3Temp + day3Humidity + day3Wind;
        forecastDay4.innerHTML = day4Temp + day4Humidity + day4Wind;
        forecastDay5.innerHTML = day5Temp + day5Humidity + day5Wind;
    })
     
}

function renderCities() {
    var cityList = document.getElementById("city-list");
    cityList.innerHTML = "";
    for (i = 0; i < searchedCities.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.setAttribute("class", "city");
        cityButton.setAttribute("id", i)
        cityButton.textContent = searchedCities[i];
        cityList.appendChild(cityButton);

    }
}


