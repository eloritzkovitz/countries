import { useTranslation } from "react-i18next";
import { ICONS } from "@constants/icons";
import type { CategorizedVisits } from "@features/visits/types";
import { VisitSection } from "./VisitSection";

interface CountryVisitsContentProps {
  visits: CategorizedVisits;
  onTripClick?: (tripId: string) => void;
}

export function CountryVisitsContent({
  visits,
  onTripClick,
}: CountryVisitsContentProps) {
  const { t } = useTranslation("atlas");

  // Handler for clicking on a visit chip
  const handleVisitChipClick = (tripId: string | undefined) => {
    if (tripId) {
      onTripClick?.(tripId);
    }
  };

  return (
    <div>
      <VisitSection
        icon={<ICONS.tripPlanned />}
        title={t("countries.details.visits.planned")}
        count={visits.tentative.length}
        visits={visits.tentative}
        status="planned"
      />
      <VisitSection
        icon={<ICONS.tripUpcoming />}
        title={t("countries.details.visits.upcoming")}
        count={visits.upcoming.length}
        visits={visits.upcoming}
        status="upcoming"
        onVisitClick={handleVisitChipClick}
      />
      <VisitSection
        icon={<ICONS.tripCompleted />}
        title={t("countries.details.visits.completed")}
        count={visits.past.length}
        visits={visits.past}
        status="completed"
        onVisitClick={handleVisitChipClick}
      />
    </div>
  );
}
