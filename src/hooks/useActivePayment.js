import { useState, useEffect } from "react";
import { getPaymentActivation } from "../api/businessSheet";

export const useActivePayment = () => {
  const [isPay, setIsPay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await getPaymentActivation();
        setIsPay(response || true);
      } catch (error) {
        console.error("Check payment failed:", error);
        setIsPay(true);
      } finally {
        setIsLoading(false);
      }
    };
    verifyPayment();
  }, []);

  return { isPay, isLoading };
};
