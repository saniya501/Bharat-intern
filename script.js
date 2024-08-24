// Replace with your actual OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

// Function to fetch and display weather for the searched city
async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherData = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherData;
        } else {
            document.getElementById('weather-result').innerHTML = `<p>City not found!</p>`;
        }
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
}

// Function to fetch and display weather for predefined cities
async function getCityWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherData = `
                <div class="city-weather-item">
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p>${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                </div>
            `;
            document.getElementById('city-weather').innerHTML += weatherData;
        } else {
            document.getElementById('city-weather').innerHTML += `<p>Could not fetch weather for ${city}.</p>`;
        }
    } catch (error) {
        document.getElementById('city-weather').innerHTML += `<p>Error fetching weather for ${city}.</p>`;
    }
}

// Fetch weather for predefined cities when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const cities = ['Mumbai', 'UAE', 'New York', 'London', 'Paris'];
    cities.forEach(city => getCityWeather(city));
});
