import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, ref } from 'yup';

import { registerUser } from "../api/auth";
import Spinner from "./global/Spinner";
import useFormData from "../hooks/useFormData";


import "./styles/RegisterForm.scss";
import { messages } from "../constants/messages";

// icons
import visibilityIcon from "../assets/images/visibility.svg";
import visibilityOffIcon from "../assets/images/visibility_off.svg";


const RegisterForm = () => {

  const registerSchema = object().shape({
    name: string().required(),
    category: string().required(),
    password: string().required().matches(/^(?=.*\d)(?=.*[A-Z]).{8,}$/, messages.invalidPassword),
    confirmPassword: string().required().oneOf([ref('password'), null], messages.invalidConfirmPassword),
    email: string().email().required(),
  });

  const { formData, handleChange, errors, validateField, submitForm } = useFormData({
    name: "",
    category: "",
    password: "",
    confirmPassword: "",
    email: ""
  }, registerSchema)


  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    await submitForm(async (data) => {
      const userData = { name: data.name, email: data.email, password: data.password, category: data.category };
      try {
        setLoading(true);
        const result = await registerUser(userData);
        if (result.status === 201) {
          navigate("/mail-confirmation", { state: { email: userData.email } });
        } else if (result.status === 400) {
          setError(messages.userExists);
        } else if (result.status === 500) {
          setError(messages.serverError);
        }
      } catch (error) {
        setError(messages.tryAgain);
      } finally {
        setLoading(false);
      }

    });


  };

  return (
    <div className="register-form-container">
      <h2>新規アカウント登録</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名前</label>
        <input
          autoFocus
          type="text"
          id="name"
          placeholder="名前を入力"
          value={formData.name}
          onFocus={() => validateField('name')}
          onChange={handleChange}
          maxLength={30}
        />
        <p className="input-limit-message">※30文字以内</p>

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

        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

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
            src={passwordVisible ? visibilityOffIcon : visibilityIcon}
            alt="Toggle visibility"
            className="password-toggle"
            onClick={handlePasswordVisibility}
          />
        </div>
        {errors.password && <div className="error">{errors.password}</div>}


        <label htmlFor="confirmPassword">パスワードを再入力</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
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
            onClick={handlePasswordVisibility}
          />
        </div>
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

        <button
          type="submit"
          disabled={
            !formData.name || !formData.category || !formData.email || !formData.password || !formData.confirmPassword
          }
        >
          新規アカウント登録
          {loading && <Spinner />}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="login-link">
        <a href="/login">ログインはこちら</a>
      </div>
    </div>
  );
};

export default RegisterForm;
