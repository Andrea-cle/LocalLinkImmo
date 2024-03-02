import "./button.scss";

const Button = (props) => {
  const { onClick, text, type, disabled } = props;

  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
