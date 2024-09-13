import React from 'react';
import './styles/AccountCreationCompleted.scss';

const AccountCreationCompleted = () => {
    return (
        <div className="account-creation-completed-container">
            <h2>アカウント作成完了</h2>
            <p>アカウント作成が完了しました <br /> COMYにようこそ！</p>
            <button
                className="business-sheet-button"
                onClick={() => window.location.href = '/business-sheet'}
            >
                ビジネスシートを作る
            </button>
            <div className="skip-link">
                <a href="/business-sheet-creation">スキップ</a>
            </div>
        </div>
    );
};

export default AccountCreationCompleted;
