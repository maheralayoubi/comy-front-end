import React, { useState } from "react"
import Modal, { ModalButton, ModalContent } from "./Modal"
import "./styles/EditModal.scss"
import { UploadImage, Fonts, Themes } from "./FormElements"

const EditDesignAndImgModal = ({ size, title, handleEdit, theme, data }) => {
    const [toggle, setToggle] = useState(false)
    const [updatedData, setUpdatedData] = useState({})

    const handleChange = (e) => {
        const { name, value, files } = e.target

        // is file
        if (files && files.length > 0) {
            const file = files[0]
            setUpdatedData((prevState) => ({
                ...prevState,
                [name]: file,
            }))
        }
        // is string
        else {
            setUpdatedData((prevState) => ({
                ...prevState,
                [name]: value,
            }))
        }
    }

    const onToggle = () => {
        setToggle((prev) => !prev)
    }

    const onEdit = async () => {
        await handleEdit(updatedData)
        onToggle()
    }

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
                            className="update"
                            style={{
                                backgroundColor: theme ? theme : "#999999",
                            }}
                            onClick={onEdit}
                        >
                            更新する
                        </button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default EditDesignAndImgModal
