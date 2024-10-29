import React from "react";

import MailConfirmationForm from "../components/MailConfirmationForm";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const Login = () => {
  return (
    <div>
      <Header />
      <MailConfirmationForm />
      <Footer />
    </div>
  );
};

export default Login;
