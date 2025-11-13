// SortKey type definition
export type SortKey<T> = Extract<keyof T, string>;