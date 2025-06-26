import React, { useState } from 'react';
import BusinessSheetTemplate from '../business-sheet/BusinessSheetTemplate';
import { SpinnerPage } from '../global/Spinner';
import './styles/ProfileDisplay.scss';

const ProfileDisplay = ({
  loadingSheet,
  errorSheet,
  selectedUserSheetData,
  selectedChatId,
  isMobileView,
  showSheet,
  closeSheet,
  isBotChat
}) => {
  const [errorNotFound, setErrorNotFound] = useState(false);
  const show = isMobileView ? showSheet : (!isBotChat ? true : showSheet);

  if (selectedChatId?.error) setErrorNotFound(true);

  return (
    <>
      {show && (
        <div className="profileDisplay">
          {show && (isMobileView || isBotChat) && (
            <img
              onClick={closeSheet}
              className="close-sheet"
              src="/images/close-sheet.svg"
              alt="close-sheet"
            />
          )}
          {loadingSheet && <SpinnerPage />}
          {errorSheet && <div className="error">{errorSheet}</div>}
          {!loadingSheet && !errorSheet && selectedUserSheetData && !selectedUserSheetData.error && !errorNotFound && (
            <BusinessSheetTemplate data={selectedUserSheetData} isEdit={false} />
          )}
          {!selectedChatId && !isMobileView && (
            <div className="placeholder">ユーザーを選択してください</div>
          )}
          {((!loadingSheet && !errorSheet && selectedChatId && (!selectedUserSheetData || selectedUserSheetData.error)) || errorNotFound) && (
            <div className="placeholder">データがありません</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileDisplay;