import React, { forwardRef } from "react";

type MapSvgContainerProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

export const MapSvgContainer = forwardRef<SVGSVGElement, MapSvgContainerProps>(
  function MapSvgContainer({ width, height, children }, ref) {
    return (
      <svg
        ref={ref}
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
  }
);