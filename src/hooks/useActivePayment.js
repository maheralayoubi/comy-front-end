import { useState, useEffect } from "react";

import { checkActivate } from "../api/businessSheet";
import { messages } from "../constants/messages";

export const useActivePayment = () => {
  const [isPay, setIsPay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await checkActivate();
        setIsPay(response);
      } catch (error) {
        console.error(messages.tryAgain, error);
      } finally {
        setIsLoading(false);
      }
    };
    verifyPayment();
  }, []);

  return { isPay, isLoading };
};
