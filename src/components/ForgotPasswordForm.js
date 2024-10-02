import React, { useState } from "react";
import { forgotPassword } from "../api/auth";
import "./styles/ForgotPasswordForm.scss";
import Spinner from "./global/Spinner";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setLoading(true);
      const response = await forgotPassword(email);
      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setError(
          response.data.message || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-form-container">
      <h2>新しいパスワード</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={!email}>
          送信
          {loading && <Spinner />}
        </button>
      </form>

      {/* Displaying success or error messages */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
