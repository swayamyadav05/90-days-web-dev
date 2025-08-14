// Utility function to combine classes
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Generate Tailwind classes from design tokens
export const getNeoBrutalismClasses = (
  variant = "primary",
  size = "md",
  type = "button"
) => {
  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-semibold rounded-none transition-all duration-150",
    "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    "border-[3px] border-black",
  ];

  // Variant-specific classes using CSS custom properties
  const variantClasses = {
    button: {
      primary: [
        "bg-[var(--color-primary-400)] text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      ],
      secondary: [
        "bg-[var(--color-secondary-400)] text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      ],
      success: [
        "bg-[var(--color-success-400)] text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      ],
      danger: [
        "bg-[var(--color-danger-400)] text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      ],
      neutral: [
        "bg-[var(--color-neutral-400)] text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      ],
      outline: [
        "bg-white text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      ],
    },

    input: {
      default: [
        "bg-white text-black rounded-sm",
        "shadow-[var(--shadow-md)]",
        "placeholder:text-gray-500 placeholder:font-normal",
        "hover:shadow-[var(--hover-shadow-md)] hover:translate-x-[2px] hover:translate-y-[2px]",
        "focus:outline-none focus:shadow-[var(--hover-shadow-sm)]",
        "focus:translate-x-[4px] focus:translate-y-[4px]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "file:border-0 file:bg-transparent file:text-sm file:font-bold",
      ],
    },

    card: {
      default: [
        "bg-white border-[3px] border-black rounded-sm",
        "shadow-[6px_6px_0px_0px_black]",
      ],
    },
  };

  // Size-specific classes
  const sizeClasses = {
    button: {
      sm: ["h-8 px-3 py-1 text-xs"],
      md: ["h-10 px-4 py-2 text-sm"],
      lg: ["h-12 px-6 py-3 text-base"],
    },

    input: {
      sm: ["h-8 px-2 py-1 text-xs"],
      md: ["h-10 px-3 py-2 text-sm"],
      lg: ["h-12 px-4 py-3 text-base"],
    },
  };

  // Combine all classes
  const allClasses = [
    ...baseClasses,
    ...(variantClasses[type]?.[variant] || []),
    ...(sizeClasses[type]?.[size] || []),
  ];

  return allClasses.join(" ");
};

// Specific utility functions for each component type
export const getButtonClasses = (
  variant = "primary",
  size = "md",
  className = ""
) => {
  return cn(
    getNeoBrutalismClasses(variant, size, "button"),
    className
  );
};

export const getInputClasses = (size = "md", className = "") => {
  return cn(
    getNeoBrutalismClasses("default", size, "input"),
    className
  );
};

export const getCardClasses = (className = "") => {
  return cn(
    getNeoBrutalismClasses("default", "md", "card"),
    className
  );
};

// Theme variants for different contexts
export const themeVariants = {
  // For task status
  taskStatus: {
    pending: "primary", // yellow
    "in-progress": "neutral", // blue
    completed: "success", // green
    cancelled: "danger", // red
  },

  // For user roles
  userRole: {
    admin: "danger", // red for admin actions
    employee: "neutral", // blue for employee actions
  },

  // For priority levels
  priority: {
    low: "neutral", // blue
    medium: "primary", // yellow
    high: "secondary", // pink
    critical: "danger", // red
  },
};

// Helper to get variant based on context
export const getContextualVariant = (context, value) => {
  return themeVariants[context]?.[value] || "primary";
};
