import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useActivePayment } from "../hooks/useActivePayment";
import { useBusiness } from "../hooks/useBusiness";
import { SpinnerPage } from "./global/Spinner";

const ProtectedPayment = () => {
  const { isPay, isLoading: isLoad } = useActivePayment();
  const { haveBusiness, isLoading } = useBusiness();

  if (isLoading || isLoad) {
    return <SpinnerPage />;
  }

  return isPay ?
    !haveBusiness ? <Outlet /> :
      <Navigate to="/profile" replace /> :
    <Navigate to="/terms-of-use" replace />
};

export default ProtectedPayment;
