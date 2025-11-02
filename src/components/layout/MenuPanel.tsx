import {
  FaXmark,
  FaGlobe,
  FaGamepad,
  FaSuitcaseRolling,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Branding, CollapsedPanelButton, Panel } from "@components";
import { useUI } from "@contexts/UIContext";

export function MenuPanel() {
  const { showMenu, setShowMenu } = useUI();

  return (
    <div className="fixed top-0 left-0 h-screen z-40 group relative">
      <Panel
        title={
          <div className="flex items-center gap-2">
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
              className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FaXmark />
            </button>
          </>
        }
      >
        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
            end
          >
            <FaGlobe />
            Atlas
          </NavLink>
          <NavLink
            to="/game"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <FaGamepad />
            Games
          </NavLink>
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
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
