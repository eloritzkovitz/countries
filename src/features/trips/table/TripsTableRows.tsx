import { CardList } from "@components";
import { mapCategoryOptionsWithIcons } from "@features/trips";
import type { ColumnKey } from "@features/trips";
import type { Trip } from "@types";
import { formatDate } from "@utils/date";
import { CountryCell } from "../components/CountryCell";
import { TripActions } from "./TripActions";
import { StatusCell } from "./StatusCell";

type TripsTableRowsProps = {
  trip: Trip;
  tripIdx: number;
  countryData: any;
  selected: boolean;
  onSelect: (id: string) => void;
  getTripRowClass: (trip: Trip, tripIdx: number) => string;
  handleResizeStart: (e: React.MouseEvent, key: ColumnKey) => void;
  onEdit: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
};

export function TripsTableRows({
  trip,
  tripIdx,
  countryData,
  selected,
  onSelect,
  getTripRowClass,
  handleResizeStart,
  onEdit,
  onDelete,
}: TripsTableRowsProps) {
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
          {/* Checkbox column */}
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative", textAlign: "center" }}
          >
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onSelect(trip.id)}
              aria-label={`Select trip ${trip.name}`}
            />
          </td>
          {/* Number column */}
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            {tripIdx + 1}
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "idx")}
            />
          </td>
          {/* Name column */}
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            {trip.name}
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "name")}
            />
          </td>
        </>
      )}
      <td
        className={`trips-td-middle
    ${idx === 0 ? "trips-td-top" : ""}
    ${idx === (trip.countryCodes?.length ?? 1) - 1 ? "trips-td-bottom" : ""}
  `}
        style={{ position: "relative" }}
      >
        <CountryCell code={code} countryData={countryData} />
        <div
          className="trips-resize-handle"
          onMouseDown={(e) => handleResizeStart(e, "countries")}
        />
      </td>
      {idx === 0 && (
        <>
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            {trip.startDate ? new Date(trip.startDate).getFullYear() : ""}
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "year")}
            />
          </td>
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            {formatDate(trip.startDate)}
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "startDate")}
            />
          </td>
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            {formatDate(trip.endDate)}
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "endDate")}
            />
          </td>
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            {trip.fullDays}
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "fullDays")}
            />
          </td>
          {/* Categories as cards */}
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            <CardList
              items={mapCategoryOptionsWithIcons(
                (trip.categories ?? []).map((cat) => ({
                  value: cat,
                  label: cat.charAt(0).toUpperCase() + cat.slice(1),
                }))
              ).map((opt) => opt.label)}
            />
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "categories")}
            />
          </td>
          {/* Status */}
          <td
            className="trips-td p-0"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            <StatusCell status={trip.status} />
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "status")}
            />
          </td>
          {/* Tags as cards */}
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            <CardList
              items={trip.tags}
              colorClass="bg-purple-100 text-purple-800"
              moreColorClass="bg-purple-200 text-purple-900"
            />
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "tags")}
            />
          </td>
          <td
            className="trips-td"
            rowSpan={trip.countryCodes?.length || 1}
            style={{ position: "relative" }}
          >
            <TripActions trip={trip} onEdit={onEdit} onDelete={onDelete} />
            <div
              className="trips-resize-handle"
              onMouseDown={(e) => handleResizeStart(e, "actions")}
            />
          </td>
        </>
      )}
    </tr>
  ));
}
