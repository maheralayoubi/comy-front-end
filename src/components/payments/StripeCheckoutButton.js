import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import useCheckoutSession from "../hooks/useCheckoutSession";

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
        <button onClick={handleClick} className="stripe-button" disabled={!stripe}>
            Subscribe for 12,000 Yen/Year
        </button>
    );
};

export default StripeCheckoutButton;