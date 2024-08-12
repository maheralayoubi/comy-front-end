import React, { useState } from 'react';
import { loginUser } from '../api/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        try {
            const result = await loginUser(userData);
            console.log('Login successful:', result);
            // TODO: Handle success (store token, redirect)
        } catch (error) {
            console.error('Login failed:', error);
            // TODO: Handle error (show error message)
        }
    };

    return (
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
    );
};

export default LoginForm;
