/**
 * Get custom styles for react-select components.
 * @param theme - "light" or "dark"
 * @returns Custom styles for react-select components
 */
export function getSelectStyles(theme: string) {
  return {
    control: (base: any) => ({
      ...base,
      border: "none",
      boxShadow: "none",
      backgroundColor: theme === "dark" ? "#4a5568" : "#fff",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1e293b" : "#e0e7ff",
      borderRadius: "6px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#222",
      fontWeight: 500,
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1e293b" : "#e0e7ff",
      color: theme === "dark" ? "#fff" : "#222",
      borderRadius: "6px",
      ":hover": {
        backgroundColor: theme === "dark" ? "#334155" : "#1e40af",
        color: "#fff",
      },
    }),
  };
}