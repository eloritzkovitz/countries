import { FaCog, FaTimes } from "react-icons/fa";
import { ActionButton, Panel, Separator } from "@components";
import { DEFAULT_PANEL_WIDTH } from "@config/constants";
import { useUI } from "@contexts/UIContext";
import { HomeCountrySelect } from "./HomeCountrySelect";
import { ThemeSettingsGroup } from "./ThemeSettingsGroup";
import { MapSettingsGroup } from "./MapSettingsGroup";
import "./Settings.css";

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
      <HomeCountrySelect />
      <Separator className="my-4" />
      <ThemeSettingsGroup />
      <Separator className="my-4" />
      <MapSettingsGroup />
    </Panel>
  );
}
