import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './App.css';


const stripePromise = loadStripe('pk_test_51Q1iVLP9a80OPGd0wMFAlGgsY9S5Kcfhc4TAHS4mKp4Jd0cDe5cTvyw5cshLGdS9jdW8QqrWrKjFTFFk65rRaCPK00mb0pfdoI');

const PaymentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentComponent;
