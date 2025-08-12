// Utility function to combine classes
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Input = ({
  className = "",
  type = "text",
  placeholder = "",
  disabled = false,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        // Neobrutalism base styles
        // "flex h-10 w-full border-[3px] border-black bg-white px-3 py-2 text-sm font-bold text-black rounded-none shadow-[4px_4px_0px_0px_black] transition-all duration-150",
        // // Focus styles
        // "focus:outline-none focus:shadow-[2px_2px_0px_0px_black] focus:translate-x-[2px] focus:translate-y-[2px]",
        // // Placeholder styles
        // "placeholder:text-gray-500 placeholder:font-normal",
        // // Disabled styles
        // "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100",
        // // File input styles
        // "file:border-0 file:bg-transparent file:text-sm file:font-bold",
        "flex h-10 w-full rounded-sm border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

export default Input;
