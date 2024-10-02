import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const loadStripeInstance = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };
    loadStripeInstance();
  }, []);

  return <Elements stripe={stripe}>{children}</Elements>;
};

export default StripeProvider;
