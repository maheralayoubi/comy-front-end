import React, { useState } from "react";
import Modal, { ModalButton, ModalContent } from "./Modal";
import Button from "./global/Button";
import PreviewHeader from "./PreviewHeader";
import BusinessSheetTemplate from "./BusinessSheetTemplate";

const PreviewModal = ({ data }) => {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Modal>
      <ModalButton>
        <Button content={"プレビュー"} variant={"white"} onClick={onToggle} />
      </ModalButton>
      <ModalContent toggle={toggle} onToggle={onToggle} size={"lg"}>
        <PreviewHeader />
        <BusinessSheetTemplate data={data} />
      </ModalContent>
    </Modal>
  );
};

export default PreviewModal;
