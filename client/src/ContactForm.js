import React from 'react';
import './App.css';

const ContactForm = () => {
  return (
    <form action="/submit-form" method="POST">
      <input type="text" name="name" placeholder="Name" required />
      <div className="g-recaptcha" data-sitekey="your-site-key"></div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
