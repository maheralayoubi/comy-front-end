import React, { useState } from "react"
import Modal, { ModalButton, ModalContent } from "./Modal"
import Button from "./global/Button"
import "./styles/EditModal.scss"

const EditModal = ({ size, title, children, handleEdit, theme }) => {
    const [toggle, setToggle] = useState(false)

    const onToggle = () => {
        setToggle((prev) => !prev)
    }

    const onEdit = async () => {
        await handleEdit()
        onToggle()
    }

    return (
        <Modal>
            <ModalButton>
                <Button
                    content={"編集"}
                    variant={"edit"}
                    style={{ color: theme, border: `1px solid ${theme}` }}
                    onClick={onToggle}
                />
            </ModalButton>
            <ModalContent toggle={toggle} onToggle={onToggle} size={size}>
                <div className="editModal">
                    <div className="title">{title}</div>
                    <div className="children">{children}</div>
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

export default EditModal
