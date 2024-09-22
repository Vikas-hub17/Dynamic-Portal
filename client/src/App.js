import React from 'react';
import WeatherComponent from './WeatherComponent';
import PaymentComponent from './PaymentComponent';
import './App.css';
import ContactForm from './ContactForm';

function App() {
  return (
    <div className="App">
      <WeatherComponent />
      <PaymentComponent />
      <ContactForm />
    </div>
  );
}

export default App;
