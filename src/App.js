import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "4e092c96ec7c088c9f371d360465a2fd";

  function pickWeatherClass(main) {
    const w = main.toLowerCase();

    if (w.includes("clear")) return "weather-clear";
    if (w.includes("cloud")) return "weather-clouds";
    if (w.includes("rain") || w.includes("drizzle")) return "weather-rain";
    if (w.includes("snow")) return "weather-snow";
    if (w.includes("mist") || w.includes("fog") || w.includes("haze")) return "weather-mist";
    if (w.includes("thunder")) return "weather-thunderstorm";
    if (w.includes("smoke") || w.includes("dust")) return "weather-smoke";

    return "weather-clouds";
  }

  const getWeatherInfo = async () => 
    {
    if (!city.trim()) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      alert("City not found!");
    }
  };

  return (
    <div className="app-container">
      <div className="title-box">Weather App</div>
      <div className="search-box">
        <input
          className="city-input"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        
        <button className="search-btn" onClick={getWeatherInfo}>☁️</button>
      </div>

      {weather && (
        <div className={`weather-card ${pickWeatherClass(weather.weather[0].main)}`}>
          <h2>{weather.name}, {weather.sys.country}</h2>

          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />

          <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
          
          <div className="weather-desc">
            {weather.weather[0].description}
          </div>

          <div className="weather-details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>

        </div>
      )
      }

    </div>
  );
}

export default App;