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
  const show = !isBotChat ? true : showSheet;

  console.log(selectedUserSheetData);

  if (selectedChatId?.error) setErrorNotFound(true);

  return (
    <>
      {show && (
        <div className="profileDisplay">
          {/* Loading state */}
          {loadingSheet && <SpinnerPage />}
          
          {/* Error state */}
          {errorSheet && <div className="error">{errorSheet}</div>}
          
          {/* Success state with data */}
          {!loadingSheet && !errorSheet && selectedUserSheetData && !selectedUserSheetData.error && !errorNotFound && (
            <>
              {isBotChat && (
                <img 
                  onClick={closeSheet} 
                  className='close-sheet' 
                  src='/images/close-sheet.svg' 
                  alt='close-sheet' 
                />
              )}
              <BusinessSheetTemplate data={selectedUserSheetData} isEdit={false} />
            </>
          )}
          
          {/* No user selected placeholder */}
          {!selectedChatId && !isMobileView && (
            <div className="placeholder">ユーザーを選択してください</div>
          )}
          
          {/* No data available placeholder */}
          {((!loadingSheet && !errorSheet && selectedChatId && (!selectedUserSheetData || selectedUserSheetData.error)) || errorNotFound) && (
            <div className="placeholder">データがありません</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileDisplay;