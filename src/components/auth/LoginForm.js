import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/Login.scss";

import { loginUser, checkAuth } from "../../api/auth";
import { messages } from "../../constants/messages";
import useFormData from "../../hooks/useFormData";
import { loginSchema, isFormComplete } from "../../utils/formUtils";
import Button from "../global/Button";

// icon
import visibilityIcon from "../../assets/images/visibility.svg";
import visibilityOffIcon from "../../assets/images/visibility_off.svg";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { formData, handleChange, errors, submitForm } = useFormData(
    {
      email: "",
      password: "",
    },
    loginSchema,
  );

  const verifyAuth = async () => {
    try {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, [navigate]);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ type: "", content: "" });

    await submitForm(async (data) => {
      try {
        setLoading(true);
        const result = await loginUser(data);

        switch (result.status) {
          case 200:
            setMessage({ type: "success", content: messages.successfulLogin });
            navigate("/profile");
            break;
          case 400:
            setMessage({ type: "error", content: messages.invalidCredentials });
            break;
          case 403:
            setMessage({ type: "error", content: messages.verifyEmail });
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
    <div className="login-form-container">
      <h2>ログイン</h2>
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

        {/* password */}
        <>
          <label htmlFor="password">パスワード</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="password-input"
              placeholder="パスワードを入力"
              value={formData.password}
              onChange={handleChange}
            />
            <img
              src={passwordVisible ? visibilityIcon : visibilityOffIcon}
              alt="Toggle visibility"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </>

        <div className="forgot-password-link">
          <a href="/forgot-password">パスワードを忘れた方はこちら</a>
        </div>

        <Button
          type="submit"
          content="ログイン"
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

      <div className="register-link">
        <a href="/register">新規登録はこちら</a>
      </div>
    </div>
  );
};

export default LoginForm;
