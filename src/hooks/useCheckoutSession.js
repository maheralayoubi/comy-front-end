import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe using environment variable
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const useCheckoutSession = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCheckoutSession = async (sessionId) => {
        setIsLoading(true);
        setError(null);

        try {
            // Load Stripe instance
            const stripe = await stripePromise;

            // Redirect to checkout
            const { error } = await stripe.redirectToCheckout({
                sessionId,
            });

            if (error) {
                console.error('Error redirecting to Stripe:', error.message);
                setError(error.message);
            }
        } catch (err) {
            console.error('Error creating checkout session:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { createCheckoutSession, isLoading, error };
};

export default useCheckoutSession;
