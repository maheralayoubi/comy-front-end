import "./styles/Modal.scss"


export const ModalButton = ({ children }) => {
  return children
}

export const ModalContent = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="overlay"></div>
      <div className="modalBox">
        <button className="closeBtn" onClick={onClose}>&times;</button>
        <div className="modalBoxChildern">
          {children}
        </div>
      </div>
    </div>
  )
}

const Modal = ({ children }) => {
  return children;
};

export default Modal;
