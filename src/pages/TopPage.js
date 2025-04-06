import React from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import TopPage from "../components/top-pages/TopPage";
import CopilotLayout from "../components/layout/CopilotLayout";

const Register = () => {
  return (
    <>
      <Header />
      <CopilotLayout>
        <TopPage />
      </CopilotLayout>
      <Footer />
    </>
  );
};

export default Register;