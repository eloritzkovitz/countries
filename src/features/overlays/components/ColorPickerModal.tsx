import { SketchPicker } from "react-color";
import { FaPalette } from "react-icons/fa6";
import { Modal, FormButton, PanelHeader } from "@components";
import { useTheme } from "@features/settings";

interface ColorPickerModalProps {
  isOpen: boolean;
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export function ColorPickerModal({
  isOpen,
  color,
  onChange,
  onClose,
}: ColorPickerModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal min-w-[260px] max-w-[400px]"
    >
      <PanelHeader
        title={
          <>
            <FaPalette />
            Select Color
          </>
        }
      />
      <SketchPicker
        color={color}
        onChangeComplete={(color) =>
          onChange(
            `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
          )
        }
        styles={{
          default: {
            picker: {
              background: theme === "dark" ? "#4a5568" : "#fff",
              color: theme === "dark" ? "#f7fafc" : undefined,
              boxShadow: "none",
            },
            saturation: { borderRadius: "4px" },
            hue: { borderRadius: "4px" },
            alpha: { borderRadius: "4px" },
          },
        }}
      />
      <div className="flex justify-end mt-4">
        <FormButton type="button" variant="primary" onClick={onClose}>
          Done
        </FormButton>
      </div>
    </Modal>
  );
}
