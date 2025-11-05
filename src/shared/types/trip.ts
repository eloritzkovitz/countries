import { ALL_TRIP_CATEGORIES, ALL_TRIP_STATUSES, ALL_TRIP_TAGS } from "@features/trips";

export type Trip = {
  id: string;
  name: string;
  description?: string;
  countryCodes: string[];
  locations?: Location[];
  startDate: string;
  endDate: string;
  fullDays: number;
  categories?: TripCategory[];
  status?: TripStatus;
  notes?: string;
  tags?: TripTag[];
};

// Location type definition
export type Location = {
  region: string;
  cities: string[];
};

// TripCategory type definition
export type TripCategory = (typeof ALL_TRIP_CATEGORIES)[number];

// TripStatus type definition
export type TripStatus = (typeof ALL_TRIP_STATUSES)[number];

// TripTag type definition
export type TripTag = (typeof ALL_TRIP_TAGS)[number];

// SortKey type definition
export type SortKey =
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
