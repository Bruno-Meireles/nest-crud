import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ type, name, value, onChange, placeholder, required }) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="custom-input"
      {...(type !== "file" && { value })}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string, 
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
