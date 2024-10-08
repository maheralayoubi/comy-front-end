import { useState, useEffect } from "react";
import { getPaymentActivation } from "../api/businessSheet";
import { tryAgainMsg } from "../constants/messages";

export const useActivePayment = () => {
  const [isPay, setIsPay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await getPaymentActivation();
        setIsPay(response || true);
      } catch (error) {
        console.error(tryAgainMsg, error);
        setIsPay(true);
      } finally {
        setIsLoading(false);
      }
    };
    verifyPayment();
  }, []);

  return { isPay, isLoading };
};
