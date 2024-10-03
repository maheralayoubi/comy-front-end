import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./pages/TopPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import MailConfirmation from "./pages/MailConfirmation";
import TermsOfUse from "./pages/TermsOfUse";
import AccountCreationCompleted from "./pages/AccountCreationCompleted";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import BusinessSheetCreation from "./pages/BusinessSheetCreation";
import ChoosePayment from "./pages/ChoosePayment";
import StripePayment from "./pages/StripePayment";
import SearchResults from "./pages/SearchResults";
import MemberList from "./pages/MemberList";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedProfile from "./components/ProtectedProfile";
import ProtectedPayment from "./components/ProtectedPayment";
import Profile from "./pages/Profile";
import Preview from "./pages/Preview";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/mail-confirmation" element={<MailConfirmation />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<TopPage />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route
            path="/account-creation-completed"
            element={<AccountCreationCompleted />}
          />
          <Route element={<ProtectedPayment />}>
            <Route
              path="/business-sheet-creation"
              element={<BusinessSheetCreation />}
            />
          </Route>
          <Route element={<ProtectedProfile />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/choose-payment" element={<ChoosePayment />} />
          <Route path="/stripe-payment" element={<StripePayment />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/member-list" element={<MemberList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
