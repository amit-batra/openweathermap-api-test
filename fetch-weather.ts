import { client, WeatherResponse } from './openweathermap-api-wrapper.ts';

async function getWeatherByCity(location: string | number) {
    const weatherData = await client({
        ...(typeof location === 'string' 
            ? { city: location }
            : { zip: location }),
        units: 'metric'
    });

    // Print the weather information
    console.log(`Weather in ${weatherData.name}:`);
    console.log(`Temperature: ${weatherData.main.temp}°C`);
    console.log(`Feels like: ${weatherData.main.feels_like}°C`);
    console.log(`Conditions: ${weatherData.weather[0].description}`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Wind Speed: ${weatherData.wind.speed} km/h`);
    console.log(``);
}

// Execute the functions sequentially
async function fetchAllCityWeather() {
    try {
        await getWeatherByCity('New Delhi');
        await getWeatherByCity('London');
        await getWeatherByCity('Paris');
        await getWeatherByCity(10001); // New York
    } catch (error: any) {
        console.error(error);
        console.error('Hint: Check your API key and network connection.');
    }
}

// Start the sequential execution
fetchAllCityWeather(); 