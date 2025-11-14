import { MapToolbar } from "./toolbar/MapToolbar";
import { MapLegendModal } from "./legend/MapLegendModal";
import { TimelineNavigator } from "./timeline/TimelineNavigator";
import { useMapLegendItems } from "@features/mapUi";
import { useUI } from "@contexts/UIContext";

interface MapUiContainerProps {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setTimelineMode: React.Dispatch<React.SetStateAction<boolean>>;
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  overlays: any[];
}

export function MapUiContainer({
  zoom,
  setZoom,
  setTimelineMode,
  years,
  selectedYear,
  setSelectedYear,
  overlays,
}: MapUiContainerProps) {
  // UI state
  const { showLegend, toggleLegend, timelineMode, uiVisible } = useUI();
  const legendItems = useMapLegendItems(overlays, timelineMode);

  return (
    <>
      <MapToolbar
        zoom={zoom}
        setZoom={setZoom}
        setTimelineMode={setTimelineMode}
      />
      {uiVisible && timelineMode && (
        <TimelineNavigator
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      )}
      <MapLegendModal
        open={showLegend}
        onClose={toggleLegend}
        items={legendItems}
      />
    </>
  );
}
