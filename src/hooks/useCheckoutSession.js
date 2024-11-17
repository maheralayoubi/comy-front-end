import { useCallback } from "react";
import secureApi from "../api/secureApi";
import { messages } from "../constants/messages";

const CHECKOUT_SESSION_ENDPOINT = "create-checkout-session";

const useCheckoutSession = () => {
  const createCheckoutSession = useCallback(async () => {
    try {
      const response = await secureApi.post(CHECKOUT_SESSION_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error(messages.tryAgain, error);
      throw error;
    }
  }, []);

  return { createCheckoutSession };
};

export default useCheckoutSession;
