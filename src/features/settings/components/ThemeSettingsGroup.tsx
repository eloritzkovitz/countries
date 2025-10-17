import React from "react";
import { FaPalette, FaSun, FaMoon } from "react-icons/fa";
import { CollapsibleHeader } from "@components";
import { useTheme } from "@contexts/ThemeContext";

export function ThemeSettingsGroup() {
  const [showThemeSettings, setShowThemeSettings] = React.useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <CollapsibleHeader
        icon={<FaPalette style={{ marginRight: 6 }} />}
        label="Theme"
        expanded={showThemeSettings}
        onToggle={() => setShowThemeSettings((v) => !v)}
      />
      {showThemeSettings && (
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <label className="font-medium" htmlFor="theme-toggle">
              Theme:
            </label>
            {/* Toggle Switch */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } theme`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              className={`relative w-12 h-4 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full transition-colors focus:outline-none`}
            >
              {/* Slider */}
              <span
                className={`absolute w-6 h-6 rounded-full transition-transform duration-300
                  ${
                    theme === "dark"
                      ? "translate-x-6 bg-gray-800"
                      : "translate-x-0 bg-gray-100"
                  }
                flex items-center justify-center shadow`}
              >
                {theme === "dark" ? (
                  <FaMoon className="text-white" />
                ) : (
                  <FaSun className="text-gray-900" />
                )}
              </span>
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Current theme:{" "}
            <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
          </div>
        </div>
      )}
    </>
  );
}
