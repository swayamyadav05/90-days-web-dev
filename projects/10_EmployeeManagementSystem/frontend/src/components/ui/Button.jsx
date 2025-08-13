import { getButtonClasses } from "../../styles/componentUtils.js";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={getButtonClasses(variant, size, className)}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
