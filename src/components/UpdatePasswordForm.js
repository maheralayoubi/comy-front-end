import React, { useState } from 'react';
import visibilityIcon from '../assets/images/visibility.svg';
import visibilityOffIcon from '../assets/images/visibility_off.svg';
import './styles/UpdatePasswordForm.scss';

const UpdatePasswordForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        // TODO: Implement password update logic here
        setMessage('パスワードを更新');
    };

    return (
        <div className="update-password-form-container">
            <h2>パスワードの再設定</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newPassword">新しいパスワード</label>
                <div className="password-input-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="newPassword"
                        placeholder="パスワードを入力"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <img
                        src={passwordVisible ? visibilityOffIcon : visibilityIcon}
                        alt="Toggle visibility"
                        className="password-toggle"
                        onClick={handlePasswordVisibility}
                    />
                </div>

                <label htmlFor="confirmNewPassword">新しいパスワードを再入力</label>
                <div className="password-input-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="confirmNewPassword"
                        placeholder="パスワードを再入力"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <img
                        src={passwordVisible ? visibilityOffIcon : visibilityIcon}
                        alt="Toggle visibility"
                        className="password-toggle"
                        onClick={handlePasswordVisibility}
                    />
                </div>

                <button type="submit" disabled={!newPassword || !confirmNewPassword}>
                    パスワードを更新
                </button>
            </form>

            {/* Displaying success or error messages */}
            {message && <p style={{ color: message === 'パスワードを更新' ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default UpdatePasswordForm;
