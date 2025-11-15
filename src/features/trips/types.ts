import type { TripCategory, TripStatus, TripTag } from "@types";

// SortKey type definition
export type TripsSortKey =
  | "name"
  | "countries"
  | "year"
  | "startDate"
  | "endDate"
  | "fullDays"
  | "categories"
  | "status"
  | "tags";

// TripFilters type definition
export type TripFilters = {
  name: string;
  country: string[];
  year: string[];
  categories: TripCategory[];
  status: TripStatus | "";
  tags: TripTag[];
};

// TripFilterState type definition
export type TripFilterState = TripFilters & {
  local: boolean;
  abroad: boolean;
  completed: boolean;
  upcoming: boolean;
};
