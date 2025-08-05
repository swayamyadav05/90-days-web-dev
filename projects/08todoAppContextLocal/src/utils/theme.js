// Theme utility functions
export const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

export const getSavedTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("theme");
  }
  return null;
};

export const saveTheme = (theme) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("theme", theme);
  }
};

export const initializeTheme = () => {
  const savedTheme = getSavedTheme();
  const systemTheme = getSystemTheme();
  const initialTheme = savedTheme || systemTheme;

  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.setAttribute("data-theme", initialTheme);
  }
  return initialTheme;
};

export const toggleTheme = () => {
  if (typeof document === "undefined" || !document.documentElement) {
    return "light"; // Safe fallback for SSR
  }

  const currentTheme =
    document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  saveTheme(newTheme);

  return newTheme;
};
