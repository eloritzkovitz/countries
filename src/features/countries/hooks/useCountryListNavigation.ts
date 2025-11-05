import { useKeyHandler } from "@hooks/useKeyHandler";
import type { Country } from "@types";

type UseCountryListNavigationProps = {
  filteredCountries: Country[];
  selectedIsoCode: string | null;
  hoveredIsoCode: string | null;
  onSelect: (iso: string | null) => void;
  onHover: (iso: string | null) => void;
  onCountryInfo?: (country: Country) => void;
  enabled?: boolean;
};

export function useCountryListNavigation({
  filteredCountries,
  selectedIsoCode,
  hoveredIsoCode,
  onSelect,
  onHover,
  onCountryInfo,
  enabled = true,
}: UseCountryListNavigationProps) {
  useKeyHandler(
    (e) => {
      if (!filteredCountries.length) return;

      // Start from hovered country if present, else selected
      let currentIsoCode = hoveredIsoCode || selectedIsoCode;
      let currentIndex = filteredCountries.findIndex(
        (c) => c.isoCode === currentIsoCode
      );
      if (currentIndex === -1) currentIndex = 0;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex =
          currentIndex < filteredCountries.length - 1 ? currentIndex + 1 : 0;
        const nextIso = filteredCountries[nextIndex].isoCode;
        onSelect(nextIso);
        onHover(nextIso);
        setTimeout(() => {
          const el = document.getElementById(nextIso);
          el?.scrollIntoView({ block: "nearest" });
        }, 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : filteredCountries.length - 1;
        const prevIso = filteredCountries[prevIndex].isoCode;
        onSelect(prevIso);
        onHover(prevIso);
        setTimeout(() => {
          const el = document.getElementById(prevIso);
          el?.scrollIntoView({ block: "nearest" });
        }, 0);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const country = filteredCountries[currentIndex];
        if (country && onCountryInfo) {
          onCountryInfo(country);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        const firstIso = filteredCountries[0].isoCode;
        onSelect(firstIso);
        onHover(firstIso);
        setTimeout(() => {
          const el = document.getElementById(firstIso);
          el?.scrollIntoView({ block: "nearest" });
        }, 0);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastIso = filteredCountries[filteredCountries.length - 1].isoCode;
        onSelect(lastIso);
        onHover(lastIso);
        setTimeout(() => {
          const el = document.getElementById(lastIso);
          el?.scrollIntoView({ block: "nearest" });
        }, 0);
      } else if (e.key === "PageDown") {
        e.preventDefault();
        const pageSize = 10; // You can adjust this or calculate visible items
        const nextIndex = Math.min(
          currentIndex + pageSize,
          filteredCountries.length - 1
        );
        const nextIso = filteredCountries[nextIndex].isoCode;
        onSelect(nextIso);
        onHover(nextIso);
        setTimeout(() => {
          const el = document.getElementById(nextIso);
          el?.scrollIntoView({ block: "nearest" });
        }, 0);
      } else if (e.key === "PageUp") {
        e.preventDefault();
        const pageSize = 10;
        const prevIndex = Math.max(currentIndex - pageSize, 0);
        const prevIso = filteredCountries[prevIndex].isoCode;
        onSelect(prevIso);
        onHover(prevIso);
        setTimeout(() => {
          const el = document.getElementById(prevIso);
          el?.scrollIntoView({ block: "nearest" });
        }, 0);
      }
    },
    ["ArrowDown", "ArrowUp", "Enter", "Home", "End", "PageDown", "PageUp"],
    enabled
  );
}
