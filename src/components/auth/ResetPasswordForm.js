import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./styles/ResetPasswordForm.scss";
import Button from "../global/Button";

import { messages } from "../../constants/messages";
import { resetPassword } from "../../api/auth";
import { isFormComplete, resetPasswordSchema } from "../../utils/formUtils";
import useFormData from "../../hooks/useFormData";

// icons
import visibilityIcon from "../../assets/images/visibility.svg";
import visibilityOffIcon from "../../assets/images/visibility_off.svg";

const ResetPasswordForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const { formData, handleChange, errors, submitForm } = useFormData(
    {
      newPassword: "",
      confirmNewPassword: "",
    },
    resetPasswordSchema,
  );

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ type: "", content: "" });

    await submitForm(async (data) => {
      const { newPassword } = data;

      try {
        setLoading(true);
        const result = await resetPassword(token, newPassword);

        switch (result.status) {
          case 200:
            setMessage({ type: "success", content: messages.updatedPassword });
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
            break;
          case 500:
            setMessage({ type: "error", content: messages.serverError });
            break;
          default:
            setMessage({ type: "error", content: messages.tryAgain });
        }
      } catch (error) {
        setMessage({ type: "error", content: messages.tryAgain });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="update-password-form-container">
      <h2>パスワードの再設定</h2>

      <form onSubmit={handleSubmit}>
        {/* newPassword */}
        <>
          <label htmlFor="newPassword">新しいパスワード</label>
          <div className="password-input-container">
            <input
              autoFocus
              type={passwordVisible ? "password" : "text"}
              id="newPassword"
              placeholder="パスワードを入力"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <img
              src={passwordVisible ? visibilityOffIcon : visibilityIcon}
              alt="Toggle visibility"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.newPassword && (
            <div className="error">{errors.newPassword}</div>
          )}
        </>

        {/* confirmNewPassword */}
        <>
          <label htmlFor="confirmNewPassword">新しいパスワードを再入力</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "password" : "text"}
              id="confirmNewPassword"
              placeholder="パスワードを再入力"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            <img
              src={passwordVisible ? visibilityOffIcon : visibilityIcon}
              alt="Toggle visibility"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.confirmNewPassword && (
            <div className="error">{errors.confirmNewPassword}</div>
          )}
        </>

        <Button
          type="submit"
          content="パスワードを更新"
          isLoading={loading}
          disabled={!isFormComplete(formData) || loading}
        />
      </form>

      {/* Enhanced message display with dynamic styling */}
      {message.content && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.content}
        </p>
      )}
    </div>
  );
};

export default ResetPasswordForm;
