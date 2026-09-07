import { useEffect, useState } from "react";
import { resolveBackendUrl } from "@lib/api-client/env";
import type { TripLocation } from "../types";

interface LocationsResponse {
  locations: TripLocation[];
}

interface UseLocationSearchProps {
  isOpen: boolean;
  search: string;
  countryCodes: string[];
  language: string;
}

interface UseLocationSearchResult {
  locations: TripLocation[];
  loading: boolean;
}

/**
 * Searches for trip locations through the backend API.
 * @param isOpen - Whether the location search is open.
 * @param search - The search query.
 * @param countryCodes - The list of country codes to search in.
 * @param language - The language to use for the search.
 * @returns The locations found and a loading state.
 */
export function useLocationSearch({
  isOpen,
  search,
  countryCodes,
  language,
}: UseLocationSearchProps): UseLocationSearchResult {
  const [locations, setLocations] = useState<TripLocation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !search.trim() || countryCodes.length === 0) {
      setLocations([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const searchLocations = async () => {
      setLoading(true);

      try {
        const backendUrl = resolveBackendUrl({
          envVar: "VITE_API_URL",
        });

        if (!backendUrl) {
          throw new Error("Backend URL is not configured");
        }

        const results = await Promise.all(
          countryCodes.map(async (countryCode) => {
            const params = new URLSearchParams({
              q: search.trim(),
              countryCode,
              lang: language,
            });

            const response = await fetch(
              `${backendUrl}/api/locations/search?${params.toString()}`,
              {
                signal: controller.signal,
              },
            );

            if (!response.ok) {
              throw new Error(`Location search failed: ${response.status}`);
            }

            const data = (await response.json()) as LocationsResponse;

            return data.locations;
          }),
        );

        const uniqueLocations = Array.from(
          new Map(
            results.flat().map((location) => [location.id, location]),
          ).values(),
        );

        setLocations(uniqueLocations);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to search locations:", error);
          setLocations([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timeout = window.setTimeout(searchLocations, 300);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [isOpen, search, countryCodes, language]);

  return { locations, loading };
}
