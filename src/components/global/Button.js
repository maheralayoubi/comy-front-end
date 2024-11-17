import "./styles/Button.scss";
import Spinner from "./Spinner";

const Button = ({
  type = "button",
  content,
  variant = "",
  isLoading,
  ...props
}) => {
  return (
    <button type={type} className={`btn ${variant}`} {...props}>
      {content}
      {isLoading && <Spinner />}
    </button>
  );
};

export default Button;
