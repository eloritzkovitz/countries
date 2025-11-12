import { useState, useRef, useEffect } from "react";
import { FaWikipediaW, FaCrosshairs, FaTimes } from "react-icons/fa";
import {
  ActionButton,
  ErrorMessage,
  FloatingChevronButton,
  LoadingSpinner,
  Modal,
  PanelHeader,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import {
  CountryFlag,
  CountryWithFlag,
  getSovereigntyInfoForTerritory,
} from "@features/countries";
import { useKeyHandler } from "@hooks/useKeyHandler";
import type { Country } from "@types";
import { CountryVisitsDrawer } from "./CountryVisitsDrawer";
import { SovereigntyBadge } from "./SovereigntyBadge";
import { VisitedStatusIndicator } from "./VisitedStatusIndicator";
import { useVisitedCountries } from "../../hooks/useVisitedCountries";
import { CountryInfoTable } from "./CountryInfoTable";

type CountryDetailsModalProps = {
  country: Country | null;
  isOpen: boolean;
  onCenterMap?: () => void;
  onClose: () => void;
};

export function CountryDetailsModal({
  country,
  isOpen,
  onCenterMap,
  onClose,
}: CountryDetailsModalProps) {
  const { currencies, loading, error } = useCountryData();
  const { isCountryVisited, getCountryVisits } = useVisitedCountries();
  const isVisited = country ? isCountryVisited(country.isoCode) : false;
  const visits = country ? getCountryVisits(country.isoCode) : [];
  const [showVisitsDrawer, setShowVisitsDrawer] = useState(false);

  // For positioning the drawer and chevron
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-close drawer when modal closes
  useEffect(() => {
    if (!isOpen) setShowVisitsDrawer(false);
  }, [isOpen]);

  // Center map handler
  useKeyHandler(
    (e) => {
      e.preventDefault();
      if (onCenterMap) onCenterMap();
    },
    ["x", "X"],
    isOpen
  );

  // Get sovereignty info
  const sovereigntyInfo = country
    ? getSovereigntyInfoForTerritory(country.isoCode)
    : undefined;

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage error={error} />;
  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none">
      {/* Visits Drawer */}
      {showVisitsDrawer && (
        <CountryVisitsDrawer
          open={showVisitsDrawer}
          onClose={() => setShowVisitsDrawer(false)}
          visits={visits}
          targetRef={modalRef}
        />
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-white rounded-xl p-8 min-w-[540px] max-w-[100vw] w-[350px] shadow-lg relative"
        containerRef={modalRef}
        floatingChildren={
          (!showVisitsDrawer && (
            <FloatingChevronButton
              targetRef={modalRef}
              position="right"
              chevronDirection="right"
              onClick={() => setShowVisitsDrawer(true)}
              ariaLabel="Show visits"
              title="Show visits"
            />
          )) ||
          undefined
        }
        useFloatingHover={true}
      >
        <div ref={modalRef} className="relative overflow-visible">
          <PanelHeader
            title={
              <span className="flex items-center gap-2">
                <CountryWithFlag
                  isoCode={country.isoCode}
                  name={country.name}
                  size="32"
                  className="font-bold text-lg"
                />
                <span className="text-gray-500 text-sm">
                  ({country.isoCode})
                </span>
                <VisitedStatusIndicator visited={isVisited} />
              </span>
            }
          >
            <ActionButton
              onClick={() =>
                window.open(
                  `https://en.wikipedia.org/wiki/${country.name.replace(
                    / /g,
                    "_"
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              ariaLabel="Open Wikipedia article"
              title="Wikipedia"
              icon={<FaWikipediaW />}
            />
            {onCenterMap && (
              <ActionButton
                onClick={onCenterMap}
                ariaLabel="Center map on country"
                title="Center map"
                icon={<FaCrosshairs />}
              />
            )}
            <ActionButton
              onClick={onClose}
              ariaLabel="Close country details"
              title="Close"
              icon={<FaTimes />}
            />
          </PanelHeader>
          {country.sovereigntyType && sovereigntyInfo && (
            <SovereigntyBadge
              type={country.sovereigntyType}
              sovereign={sovereigntyInfo.sovereign}
            />
          )}
          <CountryFlag
            flag={{
              isoCode: country.isoCode,
              source: "flagcdn",
              style: "flat",
              size: "64",
            }}
            alt={`${country.name} flag`}
            className="block mx-auto mb-4 h-16 w-auto"            
          />
          <CountryInfoTable country={country} currencies={currencies} />
        </div>
      </Modal>
    </div>
  );
}
