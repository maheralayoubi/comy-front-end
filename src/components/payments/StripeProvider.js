import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51OhPFOI6nAuCGeztC0TxeYSCmbc2D9GKx6GBpdjrmAiCDCRHmhQSxrW0aMuDN2Phvtkcmev6wx82AoicvH5dHhk800o7yv6WVO";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripeProvider = ({ children }) => (
    <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;