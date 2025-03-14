import React from "react";

import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const ForgotPassword = () => {
  return (
    <div>
      <Header />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
};

export default ForgotPassword;
