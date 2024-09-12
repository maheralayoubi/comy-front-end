import "./styles/Modal.scss"


export const ModalButton = ({ children }) => {
  return children
}

export const ModalContent = ({ isOpen, onClose, children }) => {
  return (
    <div class={`modal ${isOpen ? "open" : "close"}`}>
      <div class={`modalBox ${isOpen ? "open" : "close"}`}>
        <button class="closeBtn" onClick={onClose}>&times;</button>
        <>
          {children}
        </>
      </div>
    </div>
  )
}

const Modal = ({ children }) => {
  return children;
};

export default Modal;
