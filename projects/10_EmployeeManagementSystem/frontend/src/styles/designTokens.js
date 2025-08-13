// Neobrutalism Design System - Design Tokens
// Central configuration for all colors, spacing, and effects

export const designTokens = {
  // Core Brand Colors
  colors: {
    // Primary palette for main actions
    primary: {
      50: "#fefce8", // lightest yellow
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24", // main yellow (current bg-yellow-400)
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f", // darkest yellow
    },

    // Secondary palette for supporting actions
    secondary: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6", // main pink (current bg-pink-400)
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
    },

    // Success palette for positive actions
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80", // main green (current bg-green-400)
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },

    // Danger palette for destructive actions
    danger: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171", // main red (current bg-red-400)
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },

    // Neutral palette for info and neutral actions
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#60a5fa", // main blue (current bg-blue-400)
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },

    // Base colors
    base: {
      white: "#ffffff",
      black: "#000000",
      gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
  },

  // Neobrutalism Effects
  effects: {
    // Shadow patterns
    shadows: {
      none: "none",
      sm: "2px 2px 0px 0px black",
      md: "4px 4px 0px 0px black",
      lg: "6px 6px 0px 0px black",
      xl: "8px 8px 0px 0px black",
    },

    // Hover shadow patterns
    hoverShadows: {
      sm: "1px 1px 0px 0px black",
      md: "2px 2px 0px 0px black",
      lg: "3px 3px 0px 0px black",
      xl: "4px 4px 0px 0px black",
    },

    // Translation values for hover/active states
    translate: {
      sm: "1px",
      md: "2px",
      lg: "3px",
      xl: "4px",
    },

    // Border styles
    borders: {
      thin: "2px solid black",
      thick: "3px solid black",
      heavy: "4px solid black",
    },

    // Radius
    rounded: {
      base: "sm",
      medium: "m",
      large: "lg",
    },
  },

  // Typography
  typography: {
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
  },

  // Spacing
  spacing: {
    px: "1px",
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
  },
};

// Helper functions to generate component styles
export const generateNeoBrutalismStyle = (
  bgColor,
  textColor = designTokens.colors.base.black,
  shadowSize = "md",
  borderThickness = "thick"
) => {
  return {
    backgroundColor: bgColor,
    color: textColor,
    border: designTokens.effects.borders[borderThickness],
    boxShadow: designTokens.effects.shadows[shadowSize],
    transition: "all 150ms ease",

    // Hover state
    hover: {
      boxShadow: designTokens.effects.hoverShadows[shadowSize],
      transform: `translate(${designTokens.effects.translate[shadowSize]}, ${designTokens.effects.translate[shadowSize]})`,
    },

    // Active state
    active: {
      boxShadow: designTokens.effects.shadows.none,
      transform: `translate(${designTokens.effects.translate.lg}, ${designTokens.effects.translate.lg})`,
    },
  };
};

// Semantic color mappings for components
export const semanticColors = {
  button: {
    primary: designTokens.colors.primary[400],
    secondary: designTokens.colors.secondary[400],
    success: designTokens.colors.success[400],
    danger: designTokens.colors.danger[400],
    neutral: designTokens.colors.neutral[400],
    outline: designTokens.colors.base.white,
  },

  input: {
    background: designTokens.colors.base.white,
    border: designTokens.colors.base.black,
    text: designTokens.colors.base.black,
    placeholder: designTokens.colors.base.gray[500],
    disabled: designTokens.colors.base.gray[100],
  },

  card: {
    background: designTokens.colors.base.white,
    border: designTokens.colors.base.black,
    text: designTokens.colors.base.black,
  },
};
