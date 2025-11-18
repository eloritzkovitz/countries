import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="theme-toggle-btn"
    >
      <span
        className={
          "theme-toggle-thumb " +
          (theme === "dark"
            ? "theme-toggle-thumb-dark"
            : "theme-toggle-thumb-light")
        }
      >
        {theme === "dark" ? (
          <FaMoon className="text-white" />
        ) : (
          <FaSun className="text-gray-900" />
        )}
      </span>
    </button>
  );
}
