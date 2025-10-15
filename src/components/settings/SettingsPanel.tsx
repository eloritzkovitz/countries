import { FaCog, FaTimes } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import { Panel } from "../common/Panel";
import { Separator } from "../common/Separator";
import { DEFAULT_PANEL_WIDTH } from "../../config/constants";
import { ThemeSettingsGroup } from "./ThemeSettingsGroup";
import { MapSettingsGroup } from "./MapSettingsGroup";

type SettingsPanelProps = {
  show: boolean;
  onHide: () => void;
};

export function SettingsPanel({ show, onHide }: SettingsPanelProps) {
  return (
    <Panel
      title={
        <>
          <FaCog />
          Settings
        </>
      }
      show={show}
      width={DEFAULT_PANEL_WIDTH}
      onHide={onHide}
      headerActions={
        <ActionButton
          onClick={onHide}
          ariaLabel="Close settings panel"
          title="Close"
        >
          <FaTimes />
        </ActionButton>
      }
    >
      <ThemeSettingsGroup />
      <Separator className="my-4" />
      <MapSettingsGroup />
    </Panel>
  );
}
