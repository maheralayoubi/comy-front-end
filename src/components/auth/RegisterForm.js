import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/RegisterForm.scss";

import { registerUser } from "../../api/auth";
import useFormData from "../../hooks/useFormData";
import { messages } from "../../constants/messages";
import { isFormComplete, registerSchema } from "../../utils/formUtils";
import Button from "../global/Button";

// icons
import visibilityIcon from "../../assets/images/visibility.svg";
import visibilityOffIcon from "../../assets/images/visibility_off.svg";

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { formData, handleChange, errors, submitForm } = useFormData(
    {
      name: "",
      category: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    registerSchema,
  );

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ type: "", content: "" });

    await submitForm(async (data) => {
      const { name, email, password, category } = data;

      try {
        setLoading(true);
        const result = await registerUser({ name, email, password, category });

        switch (result.status) {
          case 201:
            setMessage({
              type: "success",
              content: messages.successfulRegister,
            });
            navigate("/mail-confirmation", { state: { email } });
            break;
          case 400:
            setMessage({ type: "error", content: messages.userExists });
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
    <div className="register-form-container">
      <h2>新規アカウント登録</h2>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <>
          <label htmlFor="name">名前</label>
          <input
            autoFocus
            type="text"
            id="name"
            placeholder="名前を入力"
            value={formData.name}
            onChange={handleChange}
            maxLength={30}
          />
          {errors.name && <div className="error">{errors.name}</div>}
          <p className="input-limit-message">※30文字以内</p>
        </>

        {/* category */}
        <>
          <label htmlFor="category">カテゴリー</label>
          <input
            type="text"
            id="category"
            placeholder="カテゴリーを入力"
            value={formData.category}
            onChange={handleChange}
            maxLength={30}
          />
          {errors.category && <div className="error">{errors.category}</div>}
          <p className="input-limit-message">※30文字以内</p>
        </>

        {/* email */}
        <>
          <label htmlFor="email">メールアドレス</label>
          <input
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
              type={passwordVisible ? "password" : "text"}
              id="password"
              className="password-input"
              placeholder="パスワードを入力"
              value={formData.password}
              onChange={handleChange}
            />
            <img
              src={passwordVisible ? visibilityOffIcon : visibilityIcon}
              alt="Toggle visibility"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </>

        {/* confirmPassword */}
        <>
          <label htmlFor="confirmPassword">パスワードを再入力</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "password" : "text"}
              id="confirmPassword"
              className="password-input"
              placeholder="パスワードを再入力"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <img
              src={passwordVisible ? visibilityOffIcon : visibilityIcon}
              alt="Toggle visibility"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
        </>

        <Button
          type="submit"
          content="新規アカウント登録"
          isLoading={loading}
          disabled={!isFormComplete(formData) || loading}
        />
      </form>

      {errors.confirmPassword && (
        <div style={{ color: message.type === "success" ? "green" : "red" }}>{errors.confirmPassword}</div>
      )}

      {/* Enhanced message display with dynamic styling */}
      {message.content && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.content}
        </p>
      )}

      <div className="login-link">
        <a href="/login">ログインはこちら</a>
      </div>
    </div>
  );
};

export default RegisterForm;
