import React from "react"
import Modal, { ModalButton, ModalContent } from "./Modal"
import Button from "./global/Button"
import PreviewHeader from "./PreviewHeader"
import BusinessSheetTemplate from "./BusinessSheetTemplate"

const PreviewModal = ({ data, isOpen, onClose }) => {
    return (
        <Modal>
            <ModalButton>
                <Button
                    content={"プレビュー"}
                    variant={"white"}
                    onClick={onClose}
                />
            </ModalButton>
            <ModalContent isOpen={isOpen} onClose={onClose}>
                <PreviewHeader />
                <BusinessSheetTemplate data={data} />
            </ModalContent>
        </Modal>
    )
}

export default PreviewModal
