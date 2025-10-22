import { useEffect } from "react";

type UseMapStatusProps = {
  geoLoading: boolean;
  overlaysLoading: boolean;
  dimensions: { width: number; height: number };
  geoData: any;
  overlaysError?: string;
  geoError?: string;
  onReady?: () => void;
};

export function useMapStatus({
  geoLoading,
  overlaysLoading,
  dimensions,
  geoData,
  overlaysError,
  geoError,
  onReady,
}: UseMapStatusProps) {
  const isLoading =
    geoLoading ||
    overlaysLoading ||
    !dimensions.width ||
    !dimensions.height ||
    !geoData;
  const errorMsg = overlaysError || geoError;

  // Call onReady when loading is complete and there are no errors
  useEffect(() => {
    if (!isLoading && !errorMsg && typeof onReady === "function") {
      onReady();
    }
  }, [isLoading, errorMsg, onReady]);

  return { isLoading, errorMsg };
}
