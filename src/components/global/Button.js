import "./styles/Button.scss"

const Button = ({content,variant,onClick,disabled}) => {
  return (
    <button type="button" className={`btn ${variant}`} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}

export default Button