import React from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { DEFAULT_MAP_BG_COLOR } from "../../config/constants";

type MapStatusProps = {
  loading: boolean;
  error?: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function MapStatus({ loading, error, containerRef }: MapStatusProps) {
  if (loading) {
    return (
      <div
        ref={containerRef}
        className={`fixed inset-0 w-full h-[100dvh] ${DEFAULT_MAP_BG_COLOR} overflow-hidden`}
      >
        <LoadingSpinner message="Loading map..." />
      </div>
    );
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return null;
}