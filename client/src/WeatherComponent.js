import React, { useState, useEffect } from 'react';
import './App.css';


const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    const response = await fetch('http://localhost:5000/api/weather');
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div>
      {weather ? (
        <div>
          <h1>Weather in {weather.city}</h1>
          <p>Temperature: {weather.temperature}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
