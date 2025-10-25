import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import type { SortKey } from "@types";
import { SearchInput } from "@components";

type SortableFilterHeaderProps = {
  label: string;
  sortKey: SortKey;
  currentSortKey: SortKey;
  sortAsc: boolean;
  onSort: (key: SortKey) => void;
  filterValue?: string;
  onFilterChange?: (v: string) => void;
  placeholder?: string;
  filterElement?: React.ReactNode;
  children?: React.ReactNode;
};

export function SortableFilterHeader({
  label,
  sortKey,
  currentSortKey,
  sortAsc,
  onSort,
  filterValue,
  onFilterChange,
  placeholder = "Filter",
  filterElement,
}: SortableFilterHeaderProps) {
  return (
    <div className="flex flex-col items-stretch h-full min-w-[10px]">
      <button
        type="button"
        className="flex items-center justify-between w-full px-2 pt-2 pb-1 bg-transparent border-0 font-semibold text-left cursor-pointer select-none"
        onClick={() => onSort(sortKey)}
        tabIndex={-1}
      >
        <span>{label}</span>
        <span>
          {currentSortKey !== sortKey ? (
            <FaSort className="inline ml-1" />
          ) : sortAsc ? (
            <FaSortUp className="inline ml-1" />
          ) : (
            <FaSortDown className="inline ml-1" />
          )}
        </span>
      </button>
      <div className="px-2 pt-1 min-h-[36px] flex items-center">
        {filterElement
          ? filterElement
          : onFilterChange && (
              <SearchInput
                value={filterValue || ""}
                onChange={onFilterChange}
                placeholder={placeholder}
                className="w-full text-xs"
              />
            )}
      </div>
    </div>
  );
}
