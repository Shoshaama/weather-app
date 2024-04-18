const apiKey = "6bf40c4574cee365db95ef761e8e0878";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorContainer = document.querySelector(".error");
const weatherContainer = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (response.status === 404) {
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "rain.png";
        break;
      case "Clear":
        weatherIcon.src = "clear.png";
        break;
      case "Drizzle":
        weatherIcon.src = "drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "mist.png";
        break;
      case "Snow":
        weatherIcon.src = "snow.png";
        break;
      default:
        weatherIcon.src = ""; // Set a default image if no match is found
    }

    errorContainer.style.display = "none";
    weatherContainer.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather("Bangalore"); // Provide a default city to display weather on page load
