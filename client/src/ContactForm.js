import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ContactForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Load the reCAPTCHA script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Register the callback function globally
    window.handleRecaptcha = (token) => {
      setRecaptchaToken(token);
    };

    return () => {
      document.body.removeChild(script);
      delete window.handleRecaptcha; // Cleanup
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    // Send form data and reCAPTCHA token to backend
    try {
      const response = await axios.post('http://localhost:5000/submit-form', {
        name: e.target.name.value,
        'g-recaptcha-response': recaptchaToken,
      });

      alert(response.data);
    } catch (error) {
      alert('Error submitting the form');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" required />
      
      {/* reCAPTCHA Widget */}
      <div
        className="g-recaptcha"
        data-sitekey="6LfMvEsqAAAAAHd__uVbCmWDXaARSG1mB8xaPqvz"
        data-callback="handleRecaptcha"
      ></div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
