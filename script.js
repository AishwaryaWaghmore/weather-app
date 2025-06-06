// Your OpenWeatherMap API key
const apiKey = "5b9b4fc3f2379a4a33225a49a85726c9";

// Fetch weather for Bengaluru by default when the page loads
document.addEventListener("DOMContentLoaded", () => {
  getWeather("Bengaluru");
});

// Add event listener to the form for fetching weather of a selected location
document.getElementById("locationForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  const location = document.getElementById("locationInput").value;
  getWeather(location);
});

// Add event listener for real-time city suggestions
document.getElementById("locationInput").addEventListener("input", (event) => {
  const query = event.target.value;
  if (query.length > 2) {
    getCitySuggestions(query);
  }
});

// Function to fetch city suggestions
async function getCitySuggestions(query) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City suggestions not found");
    }

    const cityData = await response.json();

    // Clear existing suggestions
    const dataList = document.getElementById("citySuggestions");
    dataList.innerHTML = "";

    // Populate new suggestions
    cityData.forEach((city) => {
      const option = document.createElement("option");
      option.value = `${city.name}, ${city.country}`;
      dataList.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching city suggestions:", error.message);
  }
}

// Function to fetch weather data
async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weatherData = await response.json();

    // Update the weather details in the DOM
    document.getElementById("cityName").textContent = `Weather in ${weatherData.name}`;
    document.getElementById("temperature").textContent = `Temperature: ${weatherData.main.temp}°C`;
    document.getElementById("description").textContent = `Description: ${weatherData.weather[0].description}`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
    document.getElementById("humidity").textContent = `Humidity: ${weatherData.main.humidity}%`;
    document.getElementById("feelsLike").textContent = `Feels Like: ${weatherData.main.feels_like}°C`;

    // Set the background image based on the weather condition
    setBackgroundImage(weatherData.weather[0].main);
  } catch (error) {
    alert(error.message);
  }
}

// Function to set a dynamic background image based on the weather condition
function setBackgroundImage(condition) {
  const body = document.body;

  // Define static image URLs for different weather conditions
  const weatherImages = {
    clear: "./images/clear.jpg",
    clouds: "./images/cloud.jpeg",
    rain: "./images/rain.jpg",
    snow: "./images/snow.jpg",
    thunderstorm: "./images/thunderstrom.jpg",
    mist: "./images/mist.jpg",
    default: "./images/clear.jpg",
  };

  // Map the weather condition to the appropriate image
  let imageUrl;
  switch (condition.toLowerCase()) {
    case "clear":
      imageUrl = weatherImages.clear;
      break;
    case "clouds":
      imageUrl = weatherImages.clouds;
      break;
    case "rain":
      imageUrl = weatherImages.rain;
      break;
    case "snow":
      imageUrl = weatherImages.snow;
      break;
    case "thunderstorm":
      imageUrl = weatherImages.thunderstorm;
      break;
    case "mist":
    case "fog":
      imageUrl = weatherImages.mist;
      break;
    default:
      imageUrl = weatherImages.default;
      break;
  }

  // Set the background image and styling
  body.style.backgroundImage = `url('${imageUrl}')`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}
