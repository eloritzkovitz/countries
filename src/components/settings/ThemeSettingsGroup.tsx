import React from "react";
import { FaPalette, FaSun, FaMoon } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import { CollapsibleHeader } from "../common/CollapsibleHeader";
import { useTheme } from "../../context/ThemeContext";

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
          <label className="block mb-2 font-medium">Select Theme:</label>
          <div className="flex gap-2">
            <ActionButton
              onClick={() => theme !== "light" && toggleTheme()}
              ariaLabel="Switch to light theme"
              title="Light"
              icon={<FaSun />}
              colorClass={
                theme === "light"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            >
              Light
            </ActionButton>
            <ActionButton
              onClick={() => theme !== "dark" && toggleTheme()}
              ariaLabel="Switch to dark theme"
              title="Dark"
              icon={<FaMoon />}
              colorClass={
                theme === "dark"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            >
              Dark
            </ActionButton>
          </div>
        </div>
      )}
    </>
  );
}
