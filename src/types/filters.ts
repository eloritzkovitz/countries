// Filter key type
export type FilterKey = "region" | "subregion" | "sovereignty" | "overlay";

// Filter option type
export type FilterOption = {
  label: string;
  value: string;
};

// Filter config type
export type FilterConfig<T = string, P = any> = {
  key: FilterKey;
  label: string | ((param: P) => string);
  type: "select";
  getOptions: (options?: T[]) => FilterOption[];
  getValue: (props: any, param?: P) => string;
  setValue: (props: any, val: string, param?: P) => void;
};
