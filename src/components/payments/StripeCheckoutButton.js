import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import "./styles/stripe.scss";

import useCheckoutSession from "../../hooks/useCheckoutSession";
import { messages } from "../../constants/messages";
import Button from "../global/Button";

const StripeCheckoutButton = () => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const { createCheckoutSession } = useCheckoutSession();

  const handleClick = async () => {
    setLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const { id } = await createCheckoutSession();

      if (!stripe) {
        setMessage({ type: "error", content: messages.tryAgain });
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        setMessage({ type: "error", content: messages.tryAgain });
        throw error;
      }
    } catch (error) {
      setMessage({ type: "error", content: messages.tryAgain });
      console.error("Error processing checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stripe-checkout-container">
      <h2>Stripe Payment</h2>
      <Button
        className="stripe-button"
        onClick={handleClick}
        disabled={!stripe || loading}
        content="1年プラン/13,200円(一月当たり1,100円)"
        isLoading={loading}
      />
      {/* Enhanced message display with dynamic styling */}
      {message.content && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.content}
        </p>
      )}
    </div>
  );
};

export default StripeCheckoutButton;
