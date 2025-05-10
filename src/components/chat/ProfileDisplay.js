import React from 'react';
import BusinessSheetTemplate from '../business-sheet/BusinessSheetTemplate';
import { SpinnerPage } from '../global/Spinner';
import './styles/ProfileDisplay.scss';
const ProfileDisplay = ({
  loadingSheet,
  errorSheet,
  selectedUserSheetData,
  selectedUserId,
  isMobileView
}) => {
  return (
    <div className="profileDisplay">
      {}
      {loadingSheet && <SpinnerPage />}
      {}
      {errorSheet && <div className="error">{errorSheet}</div>}
      {}
      {!loadingSheet && !errorSheet && selectedUserSheetData && (
        <BusinessSheetTemplate data={selectedUserSheetData} isEdit={false} />
      )}
      {}
      {!selectedUserId && !isMobileView && <div className="placeholder">ユーザーを選択してください</div>}
      {}
      {!loadingSheet && !errorSheet && !selectedUserSheetData && selectedUserId && <div className="placeholder">データがありません</div>}
    </div>
  );
};
export default ProfileDisplay;
