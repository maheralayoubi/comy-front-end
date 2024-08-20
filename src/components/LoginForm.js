import React, { useState } from 'react';
import { loginUser } from '../api/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for success or error messages
    const [error, setError] = useState(''); // State for error messages

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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {/* Displaying success or error messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;
