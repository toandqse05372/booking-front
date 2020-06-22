import React from 'react'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import callApi from "../../utils/apiCaller";
import './payment4.css';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
}

// Setup Stripe.js and the Elements provider
const stripePromise = loadStripe('pk_test_51Gs1h2GNT0lWowJdNu2saBCmJ2BzwKowJQuTGkUmxcFxHHY6L80y8GAQhAsEUV30KWLeEn2zXxRspwDJEHdIgMKv00ZCZWEaKE');

const Payment4 = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}


// POST the token ID to your backend.
async function stripeTokenHandler(token) {
  // const response = await fetch('/charge', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({token: token.id})
  // });
  console.log(token);
  console.log(token.id);
  callApi('payment', 'POST', {
    stripeToken: token.id,
    // payDate,
    // mail,
    // name,
    // totalPayment,
    // methodKey
  }).then(res => {
    console.log(res.data);
    return res.json;
  }).catch(function (error) {
    if (error.response) {
    }
  });

  // return response.json();
}

export default Payment4;