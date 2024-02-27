import "./button.scss";

const Button = (props) => {
  const { onClick, text, type, disabled } = props;
      return () => {
      console.log("MOUNT AND UNMOUNT BUTTON");
    };
  }, [];
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

export default Button;