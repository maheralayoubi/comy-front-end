import React from "react";
import StripeProvider from "../components/payments/StripeProvider";
import StripeCheckoutButton from "../components/payments/StripeCheckoutButton";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const StripePayment = () => {
  return (
    <div>
      <Header />
      <StripeProvider>
        <StripeCheckoutButton />
      </StripeProvider>
      <Footer />
    </div>
  );
};

export default StripePayment;
