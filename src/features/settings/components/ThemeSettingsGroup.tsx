import React from "react";
import { FaPalette } from "react-icons/fa";
import { CollapsibleHeader } from "@components";
import { useTheme } from "@contexts/SettingsContext";
import { ThemeToggle } from "./ThemeToggle";

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
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Current theme: <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
          </div>
        </div>
      )}
    </>
  );
}
