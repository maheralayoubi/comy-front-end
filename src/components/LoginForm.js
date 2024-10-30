import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, checkAuth } from "../api/auth";
import visibilityIcon from "../assets/images/visibility.svg";
import visibilityOffIcon from "../assets/images/visibility_off.svg";
import "./styles/Login.scss";
import Spinner from "./global/Spinner";
import {
  messages,
} from "../constants/messages";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!email || !password) return;

    setMessage({ type: "", content: "" });
    setLoading(true);
    try {
      const userData = { email, password };
      const result = await loginUser(userData);
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
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          required
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
            required
          />
          <img
            src={passwordVisible ? visibilityIcon : visibilityOffIcon}
            alt="Toggle visibility"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          />
        </div>

        <div className="forgot-password-link">
          <a href="/forgot-password">パスワードを忘れた方はこちら</a>
        </div>

        <button type="submit" disabled={!email || !password || loading}>
          ログイン
          {loading && <Spinner />}
        </button>

        <div className="register-link">
          <a href="/register">新規登録はこちら</a>
        </div>
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

export default LoginForm;