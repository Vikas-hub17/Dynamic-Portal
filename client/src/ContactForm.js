import React from 'react';
import './App.css';

const ContactForm = () => {
  return (
    <form action="/submit-form" method="POST">
      <input type="text" name="name" placeholder="Name" required />
      <div className="g-recaptcha" data-sitekey="6LeRkUsqAAAAAGR-TB2bwDS72A1u14ie9veMdi4k"></div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
