import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import Register from './pages/Register';
import Login from './pages/Login';
import UpdatePasswordForm from './pages/UpdatePasswordForm';
import MailConfirmation from './pages/MailConfirmation';
import TermsOfUse from './pages/TermsOfUse';
import AccountCreationCompleted from './pages/AccountCreationCompleted';
import ForgotPasswordForm from './pages/ForgotPasswordForm';
import BusinessSheetCreation from "./pages/BusinessSheetCreation"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-password" element={<UpdatePasswordForm />} />
        <Route path="/mail-confirmation" element={<MailConfirmation />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/account-creation-completed" element={<AccountCreationCompleted />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/business-sheet-creation" element={<BusinessSheetCreation />} />
      </Routes>
    </Router>
  );
};

export default App;