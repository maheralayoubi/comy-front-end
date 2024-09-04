import React, { useState } from 'react';
import './styles/ForgotPasswordForm.scss';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        // Add your form submission logic here
        try {
            // Simulating form submission
            setMessage('Password reset link has been sent to your email.');
        } catch (error) {
            setError('Something went wrong. Please try again.');
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
                </button>
            </form>

            {/* Displaying success or error messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ForgotPasswordForm;
