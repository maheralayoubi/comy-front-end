import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import visibilityIcon from '../assets/images/visibility.svg';
import visibilityOffIcon from '../assets/images/visibility_off.svg';
import './styles/Login.scss';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        setMessage('');
        setError('');
        try {
            const result = await loginUser(userData);

            if (result.status === 200) {
                setMessage('Login successful!');
                // TODO: Store token and redirect, e.g., localStorage.setItem('token', result.data.token)
            } else if (result.status === 400) {
                setError('Invalid credentials.');
            } else if (result.status === 401) {
                setError('Please verify your email before logging in.');
            } else if (result.status === 500) {
                setError('Internal server error. Please try again later.');
            }
        } catch (error) {
            // Handling unexpected errors (network issues, etc.)
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-form-container">
            <h2>新規アカウント登録</h2>
            <form onSubmit={handleSubmit}>
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
                        type={passwordVisible ? 'text' : 'password'}
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

                <div className="forgot-password-link">
                    <a href="/reset-password">パスワードを忘れた方はこちら</a>
                </div>

                <button type="submit" disabled={!email || !password}>
                    ログイン
                </button>

                <div className="register-link">
                    <a href="/register">新規登録はこちら</a>
                </div>
            </form>

            {/* Displaying success or error messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;
