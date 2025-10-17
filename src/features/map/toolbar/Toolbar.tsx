import { useState } from "react";
import {
  FaLayerGroup,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaCog,
} from "react-icons/fa";
import { ActionButton } from "@components";
import { useUI } from "@context/UIContext";
import { ZoomControls } from "./ZoomControls";
import { MapExportModal } from "../export/MapExportModal";

export function Toolbar({
  zoom,
  setZoom,
  svgRef,
  children,
}: {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  children?: React.ReactNode;
}) {
  // UI state
  const { uiVisible, toggleOverlays, toggleExport, toggleSettings } = useUI();
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={`absolute right-8 bottom-8 z-[101] flex flex-col items-end group transition-transform duration-300 ease-in-out`}
      style={{
        transform: uiVisible ? "translateX(0)" : "translateX(400px)",
        opacity: uiVisible ? 1 : 0,
        pointerEvents: uiVisible ? "auto" : "none",
        transition: "transform 0.3s, opacity 0.3s",
      }}
    >
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
            onClick={toggleOverlays}
            ariaLabel="Open Overlays Panel"
            title="Open Overlays Panel"
            className="toolbar-btn"
            icon={<FaLayerGroup />}
          />
          <ActionButton
            onClick={toggleExport}
            ariaLabel="Export map"
            title="Export"
            className="toolbar-btn"
            icon={<FaDownload />}
          />
          <MapExportModal svgRef={svgRef} />
          <div className="mx-2 w-px h-6 bg-gray-400/30" /> {/* Separator */}
          <ActionButton
            onClick={toggleSettings}
            ariaLabel="Open settings panel"
            title="Settings"
            className="toolbar-btn"
            icon={<FaCog />}
          />
          {children}
        </div>
        {/* Toggle button */}
        <ActionButton
          onClick={() => setVisible((v) => !v)}
          ariaLabel={visible ? "Hide toolbar" : "Show toolbar"}
          title={visible ? "Hide toolbar" : "Show toolbar"}
          className={`toolbar-btn toolbar-btn-action ${
            !visible ? "opacity-70" : ""
          }`}
          icon={visible ? <FaChevronRight /> : <FaChevronLeft />}
        />
      </div>
    </div>
  );
}
