import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useActivePayment } from "../hooks/useActivePayment";
import { SpinnerPage } from "./global/Spinner";

const ProtectedPayment = () => {
  const { isPay, isLoading } = useActivePayment();

  if (isLoading) {
    return <SpinnerPage />;
  }

  return isPay ? <Outlet /> : <Navigate to="/terms-of-use" replace />;
};

export default ProtectedPayment;
