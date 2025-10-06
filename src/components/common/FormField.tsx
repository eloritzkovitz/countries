import type { ReactNode } from "react";

type FormFieldProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

export function FormField({ label, children, className = "" }: FormFieldProps) {
  return (
    <label className={`flex items-center gap-2 mb-4 ${className}`}>
      {label}
      {children}
    </label>
  );
}