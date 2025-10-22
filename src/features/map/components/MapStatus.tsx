import React from "react";
import { ErrorMessage, LoadingSpinner } from "@components";
import { DEFAULT_MAP_SETTINGS } from "@config/constants";

type MapStatusProps = {
  loading: boolean;
  error?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function MapStatus({ loading, error, containerRef }: MapStatusProps) {
  if (loading) {
    return (
      <div
        ref={containerRef}
        className={`fixed inset-0 w-full h-[100dvh] ${DEFAULT_MAP_SETTINGS.bgColor} overflow-hidden`}
      >
        <LoadingSpinner message="Loading map..." />
      </div>
    );
  }
  if (error) {
    return <ErrorMessage error={error || "An unknown error occurred."} />;
  }
  return null;
}
