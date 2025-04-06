import React from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import MemberList from "../components/others/MemberList";
import CopilotLayout from "../components/layout/CopilotLayout";

const Register = () => {
  return (
    <>
      <Header />
      <CopilotLayout>
        <MemberList />
      </CopilotLayout>
      <Footer />
    </>
  );
};

export default Register;