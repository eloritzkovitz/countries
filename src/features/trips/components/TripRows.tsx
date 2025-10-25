import { CardList } from "@components";
import type { Trip } from "@types";
import { formatDate } from "@utils/date";
import { CountryCell } from "./CountryCell";
import { TripActions } from "./TripActions";
import { StatusCell } from "./StatusCell";
import { mapCategoryOptionsWithIcons } from "../config/TripCategoryIcons";

export function TripRows({
  trip,
  tripIdx,
  countryData,
  getTripRowClass,
  onEdit,
  onDelete,
}: {
  trip: Trip;
  tripIdx: number;
  countryData: any;
  getTripRowClass: (trip: Trip, tripIdx: number) => string;
  onEdit: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
}) {
  return (
    trip.countryCodes && trip.countryCodes.length > 0
      ? trip.countryCodes
      : [undefined]
  ).map((code, idx) => (
    <tr
      key={trip.id + "-" + (code || idx)}
      className={`${getTripRowClass(trip, tripIdx)} group`}
    >
      {idx === 0 && (
        <>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {tripIdx + 1}
          </td>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {trip.name}
          </td>
        </>
      )}
      <td className="trips-td">
        <CountryCell code={code} countryData={countryData} />
      </td>
      {idx === 0 && (
        <>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {trip.startDate ? new Date(trip.startDate).getFullYear() : ""}
          </td>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {formatDate(trip.startDate)}
          </td>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {formatDate(trip.endDate)}
          </td>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {trip.fullDays}
          </td>
          {/* Categories as cards */}
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            <CardList
              items={mapCategoryOptionsWithIcons(
                (trip.categories ?? []).map((cat) => ({
                  value: cat,
                  label: cat.charAt(0).toUpperCase() + cat.slice(1),
                }))
              ).map((opt) => opt.label)}
            />
          </td>
          {/* Status */}
          <td className="trips-td p-0" rowSpan={trip.countryCodes?.length || 1}>
            <StatusCell status={trip.status} />
          </td>
          {/* Tags as cards */}
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            <CardList
              items={trip.tags}
              colorClass="bg-purple-100 text-purple-800"
              moreColorClass="bg-purple-200 text-purple-900"
            />
          </td>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            <TripActions trip={trip} onEdit={onEdit} onDelete={onDelete} />
          </td>
        </>
      )}
    </tr>
  ));
}
