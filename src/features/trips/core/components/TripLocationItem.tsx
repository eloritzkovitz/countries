import { useTranslation } from "react-i18next";
import { ActionButton } from "@components";
import { ICONS } from "@constants/icons";
import type { Location } from "@lib/locations";
import { getWikipediaUrl } from "@utils";

interface TripLocationItemProps {
  location: Location;
  lang: string;
  onRemove?: (locationId: number) => void;
}

export function TripLocationItem({
  location,
  lang,
  onRemove,
}: TripLocationItemProps) {
  const { t } = useTranslation("trips");

  return (
    <div className="flex items-center justify-between rounded px-3 py-2">
      <div className="flex items-center gap-2">
        <ICONS.location className="h-4 w-4 text-muted" />

        <a
          href={getWikipediaUrl(location.name, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:!text-info"
        >
          {location.name}
        </a>
      </div>

      {onRemove && (
        <ActionButton
          icon={<ICONS.close />}
          variant="custom"
          className="p-1"
          ariaLabel={t("editor.actions.remove")}
          onClick={() => onRemove(location.id)}
        />
      )}
    </div>
  );
}
