import React from "react";

import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const ResetPassword = () => {
  return (
    <div>
      <Header />
      <ResetPasswordForm />
      <Footer />
    </div>
  );
};

export default ResetPassword;
