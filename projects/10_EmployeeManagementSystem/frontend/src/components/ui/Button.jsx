import { cva } from "class-variance-authority";

// Utility function to combine classes
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Button variants using neobrutalism style
const buttonVariants = cva(
  // Base styles - neobrutalism approach
  "inline-flex items-center justify-center font-semibold text-sm border-[2px] border-black rounded-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-yellow-400 text-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        secondary:
          "bg-pink-400 text-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        success:
          "bg-green-400 text-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        danger:
          "bg-red-400 text-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        outline:
          "bg-white text-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        neutral:
          "bg-blue-400 text-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      },
      size: {
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

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
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
