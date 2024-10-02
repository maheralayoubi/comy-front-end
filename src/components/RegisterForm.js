import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import visibilityIcon from "../assets/images/visibility.svg";
import visibilityOffIcon from "../assets/images/visibility_off.svg";
import "./styles/RegisterForm.scss";
import Spinner from "./global/Spinner";
import { validateRegisterInputs } from "../utils/validations";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, category };
    const validateInput = validateRegisterInputs({
      ...userData,
      confirmPassword,
    });

    if (validateInput) {
      setError(validateInput);
      return;
    }

    setMessage("");
    setError("");
    try {
      setLoading(true);
      const result = await registerUser(userData);
      if (result.status === 201) {
        navigate("/mail-confirmation", { state: { email } });
      } else if (result.status === 400) {
        setError(result.data.message);
      } else if (result.status === 500) {
        setError(result.data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <h2>新規アカウント登録</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名前</label>
        <input
          type="text"
          id="name"
          placeholder="名前を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
        />
        <p className="input-limit-message">※30文字以内</p>

        <label htmlFor="category">カテゴリー</label>
        <input
          type="text"
          id="category"
          placeholder="カテゴリーを入力"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          maxLength={30}
        />
        <p className="input-limit-message">※30文字以内</p>

        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">パスワード</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="password-input"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={passwordVisible ? visibilityOffIcon : visibilityIcon}
            alt="Toggle visibility"
            className="password-toggle"
            onClick={handlePasswordVisibility}
          />
        </div>

        <label htmlFor="confirmPassword">パスワードを再入力</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            id="confirmPassword"
            className="password-input"
            placeholder="パスワードを再入力"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img
            src={passwordVisible ? visibilityOffIcon : visibilityIcon}
            alt="Toggle visibility"
            className="password-toggle"
            onClick={handlePasswordVisibility}
          />
        </div>

        <button
          type="submit"
          disabled={
            !name || !category || !email || !password || !confirmPassword
          }
        >
          新規アカウント登録
          {loading && <Spinner />}
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="login-link">
        <a href="/login">ログインはこちら</a>
      </div>
    </div>
  );
};

export default RegisterForm;
