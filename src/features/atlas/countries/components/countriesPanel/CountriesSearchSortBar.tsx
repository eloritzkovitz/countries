import { SearchInput } from "@components";
import { CountrySortSelect } from "./CountrySortSelect";

type CountriesSearchSortBarProps = {
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  count: number;
};

export function CountriesSearchSortBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  count,
}: CountriesSearchSortBarProps) {
  return (
    <div>
      <div className="flex gap-2 items-stretch pb-0">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search countries..."
          className="flex-1 h-10"
        />
        <CountrySortSelect
          value={sortBy}
          onChange={(v: string) => setSortBy(v)}
        />
      </div>
      <div className="text-s text-left text-gray-500 font-semibold mb-2 mt-2 select-none">
        Showing {count} countries
      </div>
    </div>
  );
}
