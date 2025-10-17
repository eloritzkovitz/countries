import { FaCog, FaTimes } from "react-icons/fa";
import { ThemeSettingsGroup } from "./ThemeSettingsGroup";
import { MapSettingsGroup } from "./MapSettingsGroup";
import { ActionButton } from "../../components/common/ActionButton";
import { Panel } from "../../components/common/Panel";
import { Separator } from "../../components/common/Separator";
import { DEFAULT_PANEL_WIDTH } from "../../config/constants";
import { useUI } from "../../context/UIContext";

export function SettingsPanel() {
  const { showSettings, closePanel } = useUI();

  return (
    <Panel
      title={
        <>
          <FaCog />
          Settings
        </>
      }
      show={showSettings}
      width={DEFAULT_PANEL_WIDTH}
      onHide={closePanel}
      headerActions={
        <ActionButton
          onClick={closePanel}
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
