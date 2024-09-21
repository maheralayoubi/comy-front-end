import { useEffect } from "react";

const PayPalButton = () => {
  useEffect(() => {
    // Check if the PayPal Buttons are already initialized
    if (window.paypalButtonsRendered) return;

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "12000",
                  currency_code: "JPY",
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            // Implement further handling, like updating your backend with payment details
          });
        },
        onError: (err) => {
          console.error("PayPal Checkout Error:", err);
          // Handle errors as needed
        },
      })
      .render("#paypal-button-container");

    // Set a flag to indicate that the PayPal Buttons have been rendered
    window.paypalButtonsRendered = true;
  }, []); // Empty dependency array to ensure this runs only once

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
