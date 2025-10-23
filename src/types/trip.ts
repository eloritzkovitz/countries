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