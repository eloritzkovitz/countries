import React, { forwardRef } from "react";

type MapSvgContainerProps = {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
};

export const MapSvgContainer = forwardRef<SVGSVGElement, MapSvgContainerProps>(
  function MapSvgContainer({ width, height, children, className }, ref) {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full ${className ?? ""}`}
      >
        {children}
      </svg>
    );
  }
);