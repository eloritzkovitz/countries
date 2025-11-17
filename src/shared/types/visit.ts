// Visit type definition
export type Visit = {
  yearRange: string;
  tripName?: string;
};

// VisitColorMode type definition
export type VisitColorMode = "cumulative" | "yearly";

// VisitColorRoles interface definition
export interface VisitColorRoles {
  home: string;
  visitCounts: string[];
  yearly: {
    new: string;
    revisit: string;
    previous: string;
    upcoming: string;
    upcomingRevisit: string;
  };
}
