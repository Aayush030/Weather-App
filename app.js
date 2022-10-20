let weather = {
  apikey: "b07519674ab183414e0b1a0f8d48ac16",
  // fetching the weather data from openweather api
  fetchWeather: function(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apikey + "&units=metric").then(function(response) {
      return response.json();
    }).then((data) => this.displayWeather(data))
  },
  // Giving our function a cityname as input that will display weather data
  displayWeather: function(data) {
    const {
      name
    } = data;
    const {
      icon,
      description
    } = data.weather[0];
    const {
      temp,
      humidity
    } = data.main;
    const {
      speed
    } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    $(".city").text("Weather in " + name);
    $(".Icon").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
    $(".description").text(description);
    $(".temp").text(temp + "°C");
    $(".humidity").text("Humidity: " + humidity + "%");
    $(".wind").text("Wind Speed: " + speed + " km/h");
    $(".Weather").removeClass("Loading");
    $("body").css("background-image", "url(https://source.unsplash.com/1600x900/?" + name + ")");
  },
  search: function() {
    this.fetchWeather($(".search-bar").val());
  }
}

$(".but").click(function() {
  weather.search();
})

$(".search-bar").keypress(function(event) {
  if (event.key === "Enter") {
    weather.search();
  }
})

weather.fetchWeather("London");
