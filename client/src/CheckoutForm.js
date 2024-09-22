import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Q1iVLP9a80OPGd0wMFAlGgsY9S5Kcfhc4TAHS4mKp4Jd0cDe5cTvyw5cshLGdS9jdW8QqrWrKjFTFFk65rRaCPK00mb0pfdoI'); // Replace with your actual Stripe publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Payment Method Error:', error);
    } else {
      // Send paymentMethod.id to your server (backend)
      try {
        const response = await axios.post('http://localhost:5000/create-checkout-session', {
          paymentMethodId: paymentMethod.id
        });

        if (response.data.id) {
          // Redirect the user to the Stripe checkout page
          stripe.redirectToCheckout({ sessionId: response.data.id });
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
