import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { FormButton } from "@components";

type ModalActionsProps = {
  onCancel: () => void;
  onSubmit?: () => void;
  submitType?: "submit" | "button";
  submitVariant?: "primary" | "secondary";
  submitIcon: ReactNode;
  submitLabel: string;
  cancelLabel?: string;
};

export function ModalActions({
  onCancel,
  onSubmit,
  submitType = "submit",
  submitVariant = "primary",
  submitIcon,
  submitLabel,
  cancelLabel = "Cancel",
}: ModalActionsProps) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <FormButton type="button" variant="secondary" onClick={onCancel}>
        <FaTimes className="inline" /> {cancelLabel}
      </FormButton>
      <FormButton type={submitType} variant={submitVariant} onClick={onSubmit}>
        {submitIcon} {submitLabel}
      </FormButton>
    </div>
  );
}
