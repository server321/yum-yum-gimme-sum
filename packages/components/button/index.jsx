import "./index.css";

function Button({ type = "next", onClick, text, disabled }) {
  return (
    <button
      className={`button button__${type}`}
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
}

export default Button;
