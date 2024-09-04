import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import Register from './pages/Register';
import Login from './pages/Login';
import UpdatePasswordForm from './pages/UpdatePasswordForm';
import MailConfirmation from './pages/MailConfirmation';
import TermsOfUse from './pages/TermsOfUse';
import AccountCreationCompleted from './pages/AccountCreationCompleted';

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
      </Routes>
    </Router>
  );
};

export default App;