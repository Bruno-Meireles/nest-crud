import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button type={type} className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Adiciona onClick como prop opcional
  type: PropTypes.string, // Adiciona type como prop opcional (default: 'button')
};

export default Button;
