import { SketchPicker } from "react-color";
import { FaPalette } from "react-icons/fa";
import { Modal, FormButton } from "@components";
import { useTheme } from "@contexts/ThemeContext";

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
      className="bg-white rounded-xl shadow-2xl p-6 min-w-[260px] max-w-[400px]"
    >
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FaPalette />
        Select Color
      </h3>
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
