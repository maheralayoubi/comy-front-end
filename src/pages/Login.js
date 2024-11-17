import React from "react";

import LoginForm from "../components/auth/LoginForm";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const Login = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
