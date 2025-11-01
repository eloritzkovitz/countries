export type ColumnKey =
  | "select"
  | "idx"
  | "name"
  | "countries"
  | "year"
  | "startDate"
  | "endDate"
  | "fullDays"
  | "categories"
  | "status"
  | "tags"
  | "actions";

// Minimum widths for each column
export const MIN_WIDTHS: Record<ColumnKey, number> = {
  select: 10,
  idx: 20,
  name: 80,
  countries: 60,
  year: 30,
  startDate: 30,
  endDate: 30,
  fullDays: 40,
  categories: 80,
  status: 60,
  tags: 80,
  actions: 40,
};

// Default widths for each column
export const DEFAULT_WIDTHS: Record<ColumnKey, number> = {
  select: 10,
  idx: 40,
  name: 160,
  countries: 180,
  year: 50,
  startDate: 50,
  endDate: 50,
  fullDays: 80,
  categories: 180,
  status: 120,
  tags: 180,
  actions: 80,
};