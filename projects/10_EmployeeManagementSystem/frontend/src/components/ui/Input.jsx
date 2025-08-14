import { getInputClasses } from "../../styles/componentUtils";

const Input = ({
  className = "",
  type = "text",
  size = "md",
  placeholder = "",
  disabled = false,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={getInputClasses(size, className)}
      {...props}
    />
  );
};

export default Input;
