import React, { useState } from "react";

import "./styles/ForgotPasswordForm.scss";

import { forgotPassword } from "../../api/auth";
import { messages } from "../../constants/messages";
import { isFormComplete, forgotPasswordSchema } from "../../utils/formUtils";
import Button from "../global/Button";
import useFormData from "../../hooks/useFormData";

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);

  const { formData, handleChange, errors, submitForm } = useFormData(
    {
      email: "",
    },
    forgotPasswordSchema,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ type: "", content: "" });

    await submitForm(async (data) => {
      try {
        setLoading(true);
        const result = await forgotPassword(data);

        switch (result.status) {
          case 200:
            setMessage({
              type: "success",
              content: messages.sendEmailForResetPassword,
            });
            break;
          case 400:
            setMessage({ type: "error", content: messages.userNotFound });
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
    <div className="forgot-password-form-container">
      <h2>新しいパスワード</h2>

      <form onSubmit={handleSubmit}>
        {/* email */}
        <>
          <label htmlFor="email">メールアドレス</label>
          <input
            autoFocus
            type="email"
            id="email"
            placeholder="メールアドレスを入力"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </>

        <Button
          type="submit"
          content="送信"
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

export default ForgotPasswordForm;
