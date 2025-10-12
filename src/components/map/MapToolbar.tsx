import { useState } from "react";
import {
  FaLayerGroup,
  FaDownload,
  FaSun,
  FaMoon,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { ZoomControls } from "./ZoomControls";
import { ActionButton } from "../common/ActionButton";
import { useTheme } from "../../context/ThemeContext";

export function MapToolbar({
  zoom,
  setZoom,
  showOverlayManager,
  setShowOverlayManager,
  onExportSVG,
  children,
}: {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  showOverlayManager: boolean;
  setShowOverlayManager: (v: boolean) => void;
  onExportSVG: () => void;
  children?: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute right-8 bottom-8 z-[101] flex flex-col items-end group">
      {/* Zoom controls: vertical slide */}
      <div
        className={`transition-all duration-300 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } mb-2`}
        style={{
          transform: visible ? "translateY(0)" : "translateY(40px)",          
          transition: "transform 0.3s, opacity 0.3s",
        }}
      >
        <ZoomControls zoom={zoom} setZoom={setZoom} />
      </div>
      {/* Actions and toggle: aligned horizontally */}
      <div className="relative flex items-center" style={{ height: "40px" }}>
        {/* Actions: horizontal slide */}
        <div
          className={`absolute right-12 top-0 flex flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-full shadow border border-gray-300 dark:border-gray-700 px-2 transition-all duration-300 ${
            visible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "transform 0.3s, opacity 0.3s",
            height: "42px",
            alignItems: "center",
          }}
        >
          <ActionButton
            onClick={() => setShowOverlayManager(!showOverlayManager)}
            ariaLabel={
              showOverlayManager
                ? "Close Overlays Panel"
                : "Open Overlays Panel"
            }
            title={
              showOverlayManager
                ? "Close Overlays Panel"
                : "Open Overlays Panel"
            }
            colorClass="text-blue-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-gray-300"
            className="w-10 h-10 flex items-center justify-center p-0 rounded-full"
            icon={<FaLayerGroup />}
          />
          <ActionButton
            onClick={onExportSVG}
            ariaLabel="Export SVG"
            title="Export SVG"
            colorClass="text-blue-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-gray-300"
            className="w-10 h-10 flex items-center justify-center p-0 rounded-full"
            icon={<FaDownload />}
          />
          <div className="mx-2 w-px h-6 bg-gray-400/30" /> {/* Separator */}
          <ActionButton
            onClick={toggleTheme}
            ariaLabel="Toggle theme"
            title="Toggle theme"
            colorClass="text-blue-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-gray-300"
            className="w-10 h-10 flex items-center justify-center p-0 rounded-full"
            icon={theme === "dark" ? <FaSun /> : <FaMoon />}
          />
          {children}
        </div>
        {/* Toggle button */}
        <ActionButton
          onClick={() => setVisible((v) => !v)}
          ariaLabel={visible ? "Hide toolbar" : "Show toolbar"}
          title={visible ? "Hide toolbar" : "Show toolbar"}
          colorClass="bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition-opacity duration-300 absolute right-0 top-0 ${
            !visible ? "opacity-70" : ""
          }`}
          icon={visible ? <FaChevronRight /> : <FaChevronLeft />}
        />
      </div>
    </div>
  );
}
