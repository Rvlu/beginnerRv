const apiKey = "69212d61d535120c3974f6181ac82dbc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metrics&manila";

function checkWeather() {
    async const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;

}

checkWeather()  