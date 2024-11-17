import { toast } from "react-toastify";

import "./styles/CopySheetUrl.scss";

import { messages } from "../../constants/messages";

const CopySheetUrl = ({ userId }) => {
  const copyProfileUrl = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/preview/${userId}`)
      .then(() => {
        toast(messages.successfulCopy, {
          className: "toastStyle",
        });
      })
      .catch((err) => {
        alert(messages.tryAgain);
      });
  };

  return (
    <div className="copyContent">
      <div className="copyImg" onClick={copyProfileUrl}>
        <img src="/images/content_copy.png" alt="copy content" />
      </div>

      <span>ビジネスシートのURLをコピー</span>
    </div>
  );
};

export default CopySheetUrl;
