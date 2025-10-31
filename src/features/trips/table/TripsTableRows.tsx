import { CardList, Checkbox } from "@components";
import { CountryCell, mapCategoryOptionsWithIcons } from "@features/trips";
import type { ColumnKey } from "@features/trips";
import type { Trip } from "@types";
import { formatDate } from "@utils/date";
import { StatusCell } from "./StatusCell";
import { TableCell } from "./TableCell";
import { TripActions } from "./TripActions";

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
  showRowNumbers: boolean;
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
  showRowNumbers,
}: TripsTableRowsProps) {
  const rowSpan = trip.countryCodes?.length || 1;

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
          {/* Number column */}
          <TableCell
            columnKey="idx"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            {showRowNumbers ? tripIdx + 1 : null}
          </TableCell>
          {/* Checkbox column */}
          <TableCell
            columnKey="select"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            <Checkbox
              checked={selected}
              onChange={() => onSelect(trip.id)}
              aria-label={`Select trip ${trip.name}`}
            />
          </TableCell>
          {/* Name column */}
          <TableCell
            columnKey="name"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            {trip.name}
          </TableCell>
        </>
      )}
      <TableCell
        columnKey="countries"
        className={`trips-td-middle ${idx === 0 ? "trips-td-top" : ""} ${
          idx === (trip.countryCodes?.length ?? 1) - 1 ? "trips-td-bottom" : ""
        }`}
        handleResizeStart={handleResizeStart}
      >
        <CountryCell code={code} countryData={countryData} />
      </TableCell>
      {idx === 0 && (
        <>
          {/* Year */}
          <TableCell
            columnKey="year"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            {trip.startDate ? new Date(trip.startDate).getFullYear() : ""}
          </TableCell>
          {/* Start Date */}
          <TableCell
            columnKey="startDate"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            {formatDate(trip.startDate)}
          </TableCell>
          {/* End Date */}
          <TableCell
            columnKey="endDate"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            {formatDate(trip.endDate)}
          </TableCell>
          {/* Full Days */}
          <TableCell
            columnKey="fullDays"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            {trip.fullDays}
          </TableCell>
          {/* Categories */}
          <TableCell
            columnKey="categories"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            <CardList
              items={mapCategoryOptionsWithIcons(
                (trip.categories ?? []).map((cat) => ({
                  value: cat,
                  label: cat.charAt(0).toUpperCase() + cat.slice(1),
                }))
              ).map((opt) => opt.label)}
            />
          </TableCell>
          {/* Status */}
          <TableCell
            columnKey="status"
            rowSpan={rowSpan}
            className="trips-td p-0"
            handleResizeStart={handleResizeStart}
          >
            <StatusCell status={trip.status} />
          </TableCell>
          {/* Tags */}
          <TableCell
            columnKey="tags"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            <CardList
              items={trip.tags}
              colorClass="bg-purple-100 text-purple-800"
              moreColorClass="bg-purple-200 text-purple-900"
            />
          </TableCell>
          {/* Actions */}
          <TableCell
            columnKey="actions"
            rowSpan={rowSpan}
            handleResizeStart={handleResizeStart}
          >
            <TripActions trip={trip} onEdit={onEdit} onDelete={onDelete} />
          </TableCell>
        </>
      )}
    </tr>
  ));
}
