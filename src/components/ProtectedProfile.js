import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useBusiness } from "../hooks/useBusiness";
import { SpinnerPage } from "./global/Spinner";

const ProtectedProfile = () => {
  const { haveBusiness, isLoading } = useBusiness();

  if (isLoading) {
    return <SpinnerPage />;
  }

  return haveBusiness ? <Outlet /> : <Navigate to="/business-sheet-creation" replace />;
};

export default ProtectedProfile;
