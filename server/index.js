const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS to allow requests from the React app

app.get('/api/weather', (req, res) => {
  const weatherData = {
    city: 'New York',
    temperature: 25,
  };
  res.json(weatherData);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
