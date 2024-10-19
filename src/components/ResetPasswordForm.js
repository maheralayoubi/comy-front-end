import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import visibilityIcon from "../assets/images/visibility.svg";
import visibilityOffIcon from "../assets/images/visibility_off.svg";
import "./styles/ResetPasswordForm.scss";
import Spinner from "./global/Spinner";
import { validateResetPasswordInput } from "../utils/validations";
import { updatedPasswordMsg, tryAgainMsg } from "../constants/messages";
import { resetPassword } from "../api/auth";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordData = { newPassword, confirmNewPassword };
    const validateInput = validateResetPasswordInput(passwordData);

    if (validateInput) {
      setMessage(validateInput);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await resetPassword(token, newPassword)
      console.log(response)

      if (response.status === 200) {
        setMessage(updatedPasswordMsg);
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(response.data.message || tryAgainMsg);
      }
    } catch (error) {
      setMessage(tryAgainMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-password-form-container">
      <h2>パスワードの再設定</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">新しいパスワード</label>
        <div className="password-input-container">
          <input
            autoFocus
            type={passwordVisible ? "text" : "password"}
            id="newPassword"
            placeholder="パスワードを入力"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <img
            src={passwordVisible ? visibilityOffIcon : visibilityIcon}
            alt="Toggle visibility"
            className="password-toggle"
            onClick={handlePasswordVisibility}
          />
        </div>

        <label htmlFor="confirmNewPassword">新しいパスワードを再入力</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            id="confirmNewPassword"
            placeholder="パスワードを再入力"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <img
            src={passwordVisible ? visibilityOffIcon : visibilityIcon}
            alt="Toggle visibility"
            className="password-toggle"
            onClick={handlePasswordVisibility}
          />
        </div>

        <button type="submit" disabled={!newPassword || !confirmNewPassword}>
          パスワードを更新
          {loading && <Spinner />}
        </button>
      </form>

      {message && (
        <p
          style={{
            color: message === updatedPasswordMsg ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPasswordForm;
