import "./styles/Button.scss"

const Button = ({ content, variant, onClick, disabled, style }) => {
    return (
        <button
            type="button"
            className={`btn ${variant}`}
            onClick={onClick}
            disabled={disabled}
            style={style}
        >
            {content}
        </button>
    )
}

export default Button
