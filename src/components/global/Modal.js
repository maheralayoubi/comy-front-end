import "./styles/Modal.scss";

export const ModalButton = ({ children }) => {
  return children;
};

export const ModalContent = ({ toggle, onToggle, children, size }) => {
  return (
    <div className={`modal ${toggle ? "active" : ""}`}>
      <div className="overlay" onClick={onToggle}></div>
      <div className={`modalBox ${size}`}>
        <button className="closeBtn" onClick={onToggle}>
          &times;
        </button>
        <div className="modalBoxChildern">{children}</div>
      </div>
    </div>
  );
};

const Modal = ({ children }) => {
  return children;
};

export default Modal;
