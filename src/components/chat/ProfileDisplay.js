import React from 'react';
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
  const show = !isBotChat ? true : showSheet


  return (
    <>
      {show &&

        <div className="profileDisplay">
          { }
          {loadingSheet && <SpinnerPage />}
          { }
          {errorSheet && <div className="error">{errorSheet}</div>}
          { }
          {!loadingSheet && !errorSheet && selectedUserSheetData && (
            <>
              {isBotChat && <img onClick={closeSheet} className='close-sheet' src='/images/close-sheet.svg' alt='close-sheet' />}
              <BusinessSheetTemplate data={selectedUserSheetData} isEdit={false} />
            </>
          )}
          { }
          {!selectedChatId && !isMobileView && <div className="placeholder">ユーザーを選択してください</div>}
          { }
          {!loadingSheet && !errorSheet && !selectedUserSheetData && selectedChatId && <div className="placeholder">データがありません</div>}
        </div>
      }
    </>
  );
};
export default ProfileDisplay;
