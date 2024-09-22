import React, { useState, useEffect } from 'react';
import './App.css'; // Import your updated styles

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Refresh every 60 seconds
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  

  const fetchWeather = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state
    try {
      const response = await fetch('http://localhost:5000/api/weather');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message); // Capture any errors
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <div className="weather-box">
      {loading && <p>Loading weather data...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div className="weather-data fade-in"> {/* Add fade-in class */}
          <h1>Weather in {weather.city}</h1>
          <p>Temperature: {weather.temperature}°C</p>
        </div>
      )}
      <button onClick={fetchWeather}>Refresh Weather</button>
    </div>
  );
};

export default WeatherComponent;