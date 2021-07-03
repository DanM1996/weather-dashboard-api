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
var oneTemp = document.querySelector("#oneTemp");
var oneHumid = document.querySelector("#oneHumid");
var oneWind = document.querySelector("#oneWind");
var twoTemp = document.querySelector("#twoTemp");
var twoHumid = document.querySelector("#twoHumid");
var twoWind = document.querySelector("#twoWind");
var threeTemp = document.querySelector("#threeTemp");
var threeHumid = document.querySelector("#threeHumid");
var threeWind = document.querySelector("#threeWind");
var fourTemp = document.querySelector("#fourTemp");
var fourHumid = document.querySelector("#fourHumid");
var fourWind = document.querySelector("#fourWind");
var fiveTemp = document.querySelector("#fiveTemp");
var fiveHumid = document.querySelector("#fiveHumid");
var fiveWind = document.querySelector("#fiveWind");
var oneDate = document.querySelector("#oneDate");
var twoDate = document.querySelector("#twoDate");
var threeDate = document.querySelector("#threeDate");
var fourDate = document.querySelector("#fourDate");
var fiveDate = document.querySelector("#fiveDate");

cityList.addEventListener("click", function(event){
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
        var iconImg = document.createElement("img");
        iconImg.src = "http://openweathermap.org/img/wn/" + oneDay.weather[0].icon + "@2x.png";
        document.getElementById("daily-container").appendChild(iconImg);
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
            if (oneDayUV.current.uvi > 7){
                showUV.setAttribute("class", ".bg-danger");
            } else if (oneDayUV.current.uvi <= 7 && oneDayUV.current.uvi >= 3) {
                showUV.setAttribute("class", ".bg-warning");
            } else {
                showUV.setAttribute("class", ".bg-success");
            }
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
        var day1Date = moment().add(1, 'days').format(" (M/D/Y)");
        var day1Temp = "Temp: " + fiveDay.list[1].main.temp + "°F";
        var day1Humidity = " Humitidy: " + fiveDay.list[1].main.humidity
        var day1Wind = " Wind Speed: " + fiveDay.list[1].wind.speed;
        var day2Date = moment().add(2, 'days').format(" (M/D/Y)"); 
        var day2Temp = "Temp: " + fiveDay.list[2].main.temp + "°F";
        var day2Humidity = " Humitidy: " + fiveDay.list[2].main.humidity
        var day2Wind = " Wind Speed: " + fiveDay.list[2].wind.speed;
        var day3Date = moment().add(3, 'days').format(" (M/D/Y)");
        var day3Temp = "Temp: " + fiveDay.list[3].main.temp + "°F";
        var day3Humidity = " Humitidy: " + fiveDay.list[3].main.humidity
        var day3Wind = " Wind Speed: " + fiveDay.list[3].wind.speed;
        var day4Date = moment().add(4, 'days').format(" (M/D/Y)");
        var day4Temp = "Temp: " + fiveDay.list[4].main.temp + "°F";
        var day4Humidity = " Humitidy: " + fiveDay.list[4].main.humidity
        var day4Wind = " Wind Speed: " + fiveDay.list[4].wind.speed;
        var day5Date = moment().add(5, 'days').format(" (M/D/Y)");
        var day5Temp = "Temp: " + fiveDay.list[5].main.temp + "°F";
        var day5Humidity = " Humitidy: " + fiveDay.list[5].main.humidity
        var day5Wind = " Wind Speed: " + fiveDay.list[5].wind.speed;

        // display the 5 day forecast in the HTML
        // forecastDay1.innerHTML = day1Temp + day1Humidity + day1Wind;
        // forecastDay2.innerHTML = day2Temp + day2Humidity + day2Wind;
        // forecastDay3.innerHTML = day3Temp + day3Humidity + day3Wind;
        // forecastDay4.innerHTML = day4Temp + day4Humidity + day4Wind;
        // forecastDay5.innerHTML = day5Temp + day5Humidity + day5Wind;
        oneDate.innerHTML = day1Date;
        oneTemp.innerHTML = day1Temp;
        oneHumid.innerHTML = day1Humidity;
        oneWind.innerHTML = day1Wind;
        twoDate.innerHTML = day2Date;
        twoTemp.innerHTML = day2Temp;
        twoHumid.innerHTML = day2Humidity;
        twoWind.innerHTML = day2Wind;
        threeDate.innerHTML = day3Date;
        threeTemp.innerHTML = day3Temp;
        threeHumid.innerHTML = day3Humidity;
        threeWind.innerHTML = day3Wind;
        fourDate.innerHTML = day4Date;
        fourTemp.innerHTML = day4Temp;
        fourHumid.innerHTML = day4Humidity;
        fourWind.innerHTML = day4Wind;
        fiveDate.innerHTML = day5Date;
        fiveTemp.innerHTML = day5Temp;
        fiveHumid.innerHTML = day5Humidity;
        fiveWind.innerHTML = day5Wind;
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


