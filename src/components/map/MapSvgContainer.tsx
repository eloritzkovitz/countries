import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { exportSvg } from "../../utils/fileUtils";

type MapSvgContainerProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

export const MapSvgContainer = forwardRef(function MapSvgContainer(
  { width, height, children }: MapSvgContainerProps,
  ref
) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Expose exportSvg method to parent components
  useImperativeHandle(ref, () => ({
    exportSvg: () => {
      if (svgRef.current) {
        exportSvg(svgRef.current, "countries-map.svg");
      }
    },
  }));

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </svg>
  );
});
