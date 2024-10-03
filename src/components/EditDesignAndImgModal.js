import React, { useState } from "react";
import Modal, { ModalButton, ModalContent } from "./Modal";
import "./styles/EditModal.scss";
import { Input, UploadImage, Fonts, Themes } from "./FormElements";
import Spinner from "./global/Spinner";
import useLocalStorage from "../hooks/useLocalStorage";
import { editBusinessSheet, editUserData } from "../api/businessSheet"


const EditDesignAndImgModal = ({ size, title, setBusinessSheetData, theme, data }) => {

  // const imagesBaseUrl = `${process.env.REACT_APP_AWS_IMAGES_URL}/${data.userId}`
  const imagesBaseUrl = `https://comy-test.s3.ap-northeast-1.amazonaws.com/users/${data.userId}`

  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setValue, getValue } = useLocalStorage();

  const [updatedData, setUpdatedData] = useState({
    headerBackgroundImage: data.headerBackgroundImageUrl,
    profileImage: data.profileImageUrl,
    referralSheetBackgroundImage: data.referralSheetBackgroundImageUrl,
    fontPreference: data.fontPreference,
    colorPreference: data.colorPreference,
    userName: data.userName,
    userCategory: data.userCategory,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // is file
    if (files && files.length > 0) {
      const file = files[0];
      setUpdatedData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
    // is string
    else {
      setUpdatedData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  const onEdit = async () => {
    console.log("update");

    setLoading(true);

    const userBussinessData = {
      headerBackgroundImage: updatedData.headerBackgroundImage,
      profileImage: updatedData.profileImage,
      referralSheetBackgroundImage: updatedData.referralSheetBackgroundImage,
      fontPreference: updatedData.fontPreference,
      colorPreference: updatedData.colorPreference,
    }

    const userData = { name: updatedData.userName, category: updatedData.userCategory }
    await editBusinessSheet(userBussinessData);
    await editUserData(userData);
    setValue("businessSheetData", { ...data, ...updatedData });

    if (typeof updatedData.headerBackgroundImage === "object" && updatedData.headerBackgroundImage !== null) {
      setValue("businessSheetData", { ...data, ...updatedData, headerBackgroundImageUrl: `${imagesBaseUrl}/header-background` });
    }

    if (typeof updatedData.profileImage === "object" && updatedData.profileImage !== null) {
      setValue("businessSheetData", { ...data, ...updatedData, profileImageUrl: `${imagesBaseUrl}/profile` });
    }

    if (typeof updatedData.referralSheetBackgroundImage === "object" && updatedData.referralSheetBackgroundImage !== null) {
      setValue("businessSheetData", { ...data, ...updatedData, referralSheetBackgroundImageUrl: `${imagesBaseUrl}/referral-background` });
    }

    setBusinessSheetData(getValue("businessSheetData"));
    onToggle();
    setLoading(false);
  };


  return (
    <Modal>
      <ModalButton>
        <div className="editProfile" onClick={onToggle}>
          <img src="/images/edit.png" alt="copy content" />
          <span>プロフィールを編集</span>
        </div>
      </ModalButton>
      <ModalContent toggle={toggle} onToggle={onToggle} size={size}>
        <div className="editModal">
          <div className="title">{title}</div>
          <div className="children">
            <UploadImage
              title="ヘッダー背景画像を設定してください"
              value={updatedData?.headerBackgroundImage}
              onChange={handleChange}
              name="headerBackgroundImage"
              setBusinessSheetData={setUpdatedData}
            />
            <UploadImage
              title="プロフィール画像を設定してください"
              value={updatedData?.profileImage}
              onChange={handleChange}
              name="profileImage"
              setBusinessSheetData={setUpdatedData}
            />

            <Input
              lable="氏名"
              placeholder="氏名"
              maxLength={20}
              value={updatedData.userName}
              onChange={handleChange}
              name="userName"
            />

            <Input
              lable="カテゴリー"
              placeholder="カテゴリー"
              maxLength={20}
              value={updatedData.userCategory}
              onChange={handleChange}
              name="userCategory"
            />

            <UploadImage
              title="リファーラルシートの背景画像をアップロードしてください"
              value={updatedData?.referralSheetBackgroundImage}
              onChange={handleChange}
              name="referralSheetBackgroundImage"
              setBusinessSheetData={setUpdatedData}
            />
            <Fonts
              title="文字のタイプを選んでください"
              value={updatedData?.fontPreference}
              onChange={handleChange}
              name="fontPreference"
            />
            <Themes
              title="色を選んでください"
              value={updatedData?.colorPreference}
              onChange={handleChange}
              name="colorPreference"
            />
          </div>
          <div className="controlButtons">
            <button className="cancel" onClick={onToggle}>
              キャンセル
            </button>
            <button
              disabled={!updatedData.userName.trim() || !updatedData.userCategory.trim()}
              type="button"
              className="update"
              style={{
                backgroundColor: theme ? theme : "#999999",
              }}
              onClick={onEdit}
            >
              更新する
              {loading && <Spinner />}
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditDesignAndImgModal;
