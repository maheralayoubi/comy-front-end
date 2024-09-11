import React, { useState } from 'react';
import './styles/ChoosePayment.scss';

const ChoosePayment = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handlePaymentSelection = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };

    const isButtonDisabled = !isChecked || !selectedPayment;

    return (
        <div className="choose-payment-container">
            <h2>プランの選択</h2>
            <div className="plan-selection">
                <input
                    type="checkbox"
                    id="yearly-plan"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="yearly-plan">
                    1年プラン/13,200円(一月当たり1,100円)
                </label>
            </div>
            <div className="payment-buttons">
                <button
                    className={`payment-button ${selectedPayment === 'stripe' ? 'active' : ''}`}
                    onClick={() => handlePaymentSelection('stripe')}
                >
                    Pay with Stripe
                </button>
                <button
                    className={`payment-button ${selectedPayment === 'paypal' ? 'active' : ''}`}
                    onClick={() => handlePaymentSelection('paypal')}
                >
                    Pay with Paypal
                </button>
            </div>
            <button
                className="next-button"
                disabled={isButtonDisabled}
                onClick={() => alert('Proceed to the next step')}
            >
                次へ
            </button>
        </div>
    );
};

export default ChoosePayment;
