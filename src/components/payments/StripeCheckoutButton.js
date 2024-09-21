// StripeCheckoutButton.js
import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import useCheckoutSession from "../../hooks/useCheckoutSession";
import "./styles/stripe.scss"; // Import the stripe styles

const StripeCheckoutButton = () => {
  const stripe = useStripe();
  const { createCheckoutSession } = useCheckoutSession();

  const handleClick = async () => {
    try {
      const { id } = await createCheckoutSession();

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error processing checkout:", error);
    }
  };

  return (
    <div className="stripe-checkout-container">
      <h2>Stripe Payment</h2>
      <button
        className="stripe-button"
        onClick={handleClick}
        disabled={!stripe}
      >
        1年プラン/13,200円(一月当たり1,100円)
      </button>
    </div>
  );
};

export default StripeCheckoutButton;
