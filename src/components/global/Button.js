import "./styles/Button.scss";
import Spinner from "./Spinner";

const Button = ({ content, variant, onClick, disabled, style, isLoading }) => {
  return (
    <button
      type="button"
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {content}
      {isLoading && <Spinner />}
    </button>
  );
};

export default Button;
