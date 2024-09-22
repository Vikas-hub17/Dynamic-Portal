const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const stripe = require('stripe')('sk_test_51Q1iVLP9a80OPGd09wSix49j9lDvzPHCj5NAQpX8fWcjBTahRxMCmkp3OKtJ3cdsJ8MQb6NrIgqkw7q9TiCIYrFF00BKrFYLi0'); // Replace with your actual Stripe secret key
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000' // Or your actual frontend URL
}));


// Middleware
app.use(cors()); // Enable CORS to allow requests from your React front-end
app.use(bodyParser.json()); // Parse JSON bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Simulated Weather Data API
app.get('/api/weather', (req, res) => {
  const cities = ['New York', 'London', 'Sydney', 'Tokyo', 'Paris', 'Berlin'];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomTemperature = Math.floor(Math.random() * 40); // Random temperature between 0 and 40

  const weatherData = {
    city: randomCity,
    temperature: randomTemperature,
  };
  res.json(weatherData);
});



// Stripe Payment Gateway API
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Sample Product' },
          unit_amount: 2000, // $20.00
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

// Google reCAPTCHA Form Submission API
app.post('/submit-form', async (req, res) => {
  const token = req.body['g-recaptcha-response'];
  const secretKey = '6LfMvEsqAAAAAAaDMFNqXEQ8FVUobeOIO2TpaNhg'; // Replace with your actual reCAPTCHA secret key

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(verificationURL);
    if (response.data.success) {
      res.send('Form submitted successfully.');
    } else {
      res.status(400).send('reCAPTCHA verification failed.');
    }
  } catch (error) {
    res.status(500).send('Error verifying reCAPTCHA.');
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
