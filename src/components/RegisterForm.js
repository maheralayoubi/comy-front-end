import React, { useState } from 'react';
import { registerUser } from '../api/auth';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for validation messages
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        setMessage('');
        setError('');
        try {
            const result = await registerUser(userData);

            if (result.status === 201) {
                setMessage(result.data.message); // "User registered successfully. Please verify your email."
            } else if (result.status === 400) {
                setError(result.data.message); // "Invalid input or user already exists"
            } else if (result.status === 500) {
                setError(result.data.message); // "Internal server error"
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
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Register</button>
            </form>
            {/* Displaying success or error messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RegisterForm;
