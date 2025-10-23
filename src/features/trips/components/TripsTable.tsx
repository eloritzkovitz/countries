import { FaEdit, FaTrash } from "react-icons/fa";
import { CountryFlag } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import type { Trip } from "@types";
import "./TripsTable.css";

type TripsTableProps = {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
};

export function TripsTable({ trips, onEdit, onDelete }: TripsTableProps) {
  const countryData = useCountryData();

  return (
    <div
      className="overflow-x-auto w-full"
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <table className="trips-table w-full min-w-[1200px]">
        <thead>
          <tr>
            <th className="trips-th">Name</th>
            <th className="trips-th">Countries</th>
            <th className="trips-th">Year</th>
            <th className="trips-th">Start Date</th>
            <th className="trips-th">End Date</th>
            <th className="trips-th">Full Days</th>
            <th className="trips-th">Notes</th>
            <th className="trips-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.flatMap((trip) =>
            (trip.countryCodes && trip.countryCodes.length > 0
              ? trip.countryCodes
              : [undefined]
            ).map((code, idx) => {
              const country = code
                ? countryData.countries.find(
                    (c) => c.isoCode?.toLowerCase() === code.toLowerCase()
                  )
                : null;
              return (
                <tr key={trip.id + "-" + (code || idx)}>
                  {idx === 0 && (
                    <>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        {trip.name}
                      </td>
                    </>
                  )}
                  <td className="trips-td">
                    {country ? (
                      <span className="trips-country-item">
                        <CountryFlag
                          flag={{
                            isoCode: country.isoCode,
                            source: "svg",
                            style: "flat",
                            size: "32x24",
                          }}
                        />
                        <span className="trips-country-name">
                          {country.name}
                        </span>
                      </span>
                    ) : code ? (
                      <span>{code}</span>
                    ) : (
                      <span className="text-gray-400 italic">No country</span>
                    )}
                  </td>
                  {idx === 0 && (
                    <>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        {trip.startDate
                          ? new Date(trip.startDate).getFullYear()
                          : ""}
                      </td>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        {trip.startDate
                          ? new Date(trip.startDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        {trip.endDate
                          ? new Date(trip.endDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        {trip.fullDays}
                      </td>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        {trip.notes}
                      </td>
                      <td
                        className="trips-td"
                        rowSpan={trip.countryCodes?.length || 1}
                      >
                        <div className="flex gap-2">
                          <button
                            className="px-2 py-1 bg-yellow-500 text-white rounded"
                            onClick={() => onEdit(trip)}
                            title="Edit Trip"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="px-2 py-1 bg-red-600 text-white rounded"
                            onClick={() => onDelete(trip)}
                            title="Delete Trip"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
