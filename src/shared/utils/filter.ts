import type { FilterConfig, FilterOption } from "@types";

/**
 * Creates a select filter configuration object.
 * @param key - The unique key for the filter.
 * @param label - The label for the filter, can be a string or a function returning a string.
 * @param getOptions - Function to retrieve the filter options.
 * @param getValue - Function to get the current value of the filter.
 * @param setValue - Function to set the value of the filter.
 * @returns A FilterConfig object for the select filter.
 */
export function createSelectFilter<
  T = string,
  P = any,
  K extends string = string
>(
  key: K,
  label: string | ((param: P) => string),
  getOptions: (options?: T[]) => FilterOption[],
  getValue: (props: any, param?: P) => string,
  setValue: (props: any, val: string, param?: P) => void
): FilterConfig<T, P, K> {
  return {
    key,
    label,
    type: "select",
    getOptions,
    getValue,
    setValue,
  };
}
