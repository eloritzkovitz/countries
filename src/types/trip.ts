export type Trip = {
  id: string;
  name: string;
  description?: string;
  countryCodes: string[];
  locations?: Location[];
  startDate: string;
  endDate: string;
  fullDays: number;
  notes?: string;
}

// Location type definition
export type Location = {
  region: string;
  cities: string[];
}

// SortKey type definition
export type SortKey = "name" | "countries" | "year" | "startDate" | "endDate" | "fullDays" | "notes";

// TripFilters type definition
export type TripFilters = {
  name: string;
  country: string;
  year: string;
};