import {
  FaXmark,
  FaGlobe,
  FaGamepad,
  FaSuitcaseRolling,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Branding, CollapsedPanelButton, Panel } from "@components";
import { useUI } from "@contexts/UIContext";
import "./MenuPanel.css";

export function MenuPanel() {
  const { showMenu, setShowMenu } = useUI();

  return (
    <div className="menu-panel-container">
      <Panel
        title={
          <div className="menu-panel-title">
            <Branding size={40} title="Atlaset" />
          </div>
        }
        show={showMenu}
        showSeparator={false}
        headerActions={
          <>
            <button
              onClick={() => setShowMenu(false)}
              aria-label="Hide sidebar"
              title="Hide sidebar"
              className="menu-panel-header-action"
            >
              <FaXmark />
            </button>
          </>
        }
      >
        {/* Navigation */}
        <nav className="menu-panel-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `menu-panel-link${isActive ? " menu-panel-link-active" : ""}`
            }
            end
          >
            <FaGlobe />
            Atlas
          </NavLink>
          <NavLink
            to="/game"
            className={({ isActive }) =>
              `menu-panel-link${isActive ? " menu-panel-link-active" : ""}`
            }
          >
            <FaGamepad />
            Games
          </NavLink>
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              `menu-panel-link${isActive ? " menu-panel-link-active" : ""}`
            }
          >
            <FaSuitcaseRolling />
            Trips
          </NavLink>
        </nav>
      </Panel>
      {/* Collapsed action button */}
      <CollapsedPanelButton
        onClick={() => setShowMenu(true)}
        visible={!showMenu}
      />
    </div>
  );
}
