import { CountryCell } from "./CountryCell";
import { TripActions } from "./TripActions";
import { formatDate } from "@utils/date";
import type { Trip } from "@types";

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
      className={getTripRowClass(trip, tripIdx)}
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
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            {trip.notes}
          </td>
          <td className="trips-td" rowSpan={trip.countryCodes?.length || 1}>
            <TripActions trip={trip} onEdit={onEdit} onDelete={onDelete} />
          </td>
        </>
      )}
    </tr>
  ));
}
