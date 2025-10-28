import React from "react";

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded font-semibold focus:outline-none transition-colors";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      : "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600";
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <button
      className={`${base} ${styles} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
