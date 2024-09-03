import React from 'react';
import './styles/MailConfirmation.scss';

const MailConfirmation = () => {
    const email = 'xxxxxxxxxxxxxxxxxx@gmail.com'; // Replace with actual email logic if needed

    return (
        <div className="mail-confirmation-container">
            <h2>メールを確認してください</h2>
            <p>「会員登録のご案内」を下記のメールアドレス宛にお送りしました。</p>

            <div className="email-info-container">
                <h3>メールアドレス</h3>
                <p className="email">{email}</p>
            </div>

            <p>メール本文に記載したURLから24時間以内に本登録のお手続きをしてください。万が一、「会員登録のご案内」が届かない場合は、迷惑フォルダに入っていないかご確認ください。</p>
            <p>上記の点に当てはまらない場合、ご入力いただいたメールアドレスが間違っている可能性があります。再度メールアドレスをご入力ください。</p>

            <button type="button" onClick={() => window.location.href = '/register'}>
                トップへ
            </button>
        </div>
    );
};

export default MailConfirmation;
