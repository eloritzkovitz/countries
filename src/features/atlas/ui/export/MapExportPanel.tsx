import { useRef, useState } from "react";
import { FaDownload, FaTimes, FaFileImage } from "react-icons/fa";
import {
  ActionButton,
  FormButton,
  Panel,
  SelectInput,
  Separator,
} from "@components";
import { useUI } from "@contexts/UIContext";
import { SvgOptions } from "./SvgOptions";
import { ImageOptions } from "./ImageOptions";
import type {
  ExportFormat,
  ImageExportOptions,
  SvgExportOptions,
} from "./types";
import {
  EXPORT_FORMAT_OPTIONS,
  PNG_SCALE_OPTIONS,
} from "./constants/exportOptions";
import { exportSvg, exportSvgAsImage } from "./utils/mapExport";
import "./MapExportPanel.css";

type MapExportModalProps = {
  svgRef: React.RefObject<SVGSVGElement | null>;
};

export function MapExportPanel({ svgRef }: MapExportModalProps) {
  const { showExport, closePanel } = useUI();

  // Export options state
  const [format, setFormat] = useState<ExportFormat>("svg");
  const svgOptions = useRef<SvgExportOptions>({ svgInlineStyles: true });
  const imageOptions = useRef<ImageExportOptions>({
    scale: 2,
    quality: 1,
    backgroundColor: "#ffffff",
  });

  // Export handler
  const handleExport = () => {
    if (!svgRef?.current) return;
    if (format === "svg") {
      exportSvg(svgRef.current, "map.svg", svgOptions.current.svgInlineStyles);
    } else {
      const ext = format === "jpeg" ? "jpg" : format;
      exportSvgAsImage(
        svgRef.current,
        `map@${imageOptions.current.scale}x.${ext}`,
        format,
        imageOptions.current.scale,
        true,
        8192,
        imageOptions.current.quality,
        imageOptions.current.backgroundColor
      );
    }
    closePanel();
  };

  return (
    <Panel
      title={
        <>
          <FaDownload />
          Export
        </>
      }
      show={showExport}
      onHide={closePanel}
      headerActions={
        <ActionButton
          onClick={closePanel}
          ariaLabel="Close export menu"
          title="Close"
        >
          <FaTimes />
        </ActionButton>
      }
      className="relative"
    >
      <div className="pb-20">
        {/* Format selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Format:</span>
          <div className="export-format-select">
            <SelectInput
              label=" "
              value={format}
              onChange={(val) => setFormat(val as ExportFormat)}
              options={EXPORT_FORMAT_OPTIONS}
            />
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Options section header */}
        <div className="mb-4 mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Options
        </div>

        {/* SVG options */}
        {format === "svg" && (
          <SvgOptions
            onOptionsChange={(opts) => {
              svgOptions.current = opts;
            }}
          />
        )}

        {/* Image options */}
        {format !== "svg" && (
          <ImageOptions
            format={format}
            scaleOptions={PNG_SCALE_OPTIONS}
            onOptionsChange={(opts) => {
              imageOptions.current = opts;
            }}
          />
        )}
      </div>

      {/* Export button */}
      <div className="absolute bottom-0 left-0 w-full px-4 pb-4 bg-white dark:bg-gray-900">
        <FormButton
          onClick={handleExport}
          className="w-full"
          aria-label={"Export"}
          title={"Export"}
          disabled={!svgRef?.current}
        >
          <FaFileImage className="inline mr-2" />
          Export
        </FormButton>
      </div>
    </Panel>
  );
}
