import React from 'react';
import './styles/EmptyState.scss';
const EmptyState = ({ message }) => {
  return (
    <div className="emptyState">
      <p>{message || 'ユーザーを選択してください'}</p>
    </div>
  );
};
export default EmptyState;
