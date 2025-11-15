// Filter key type
export type FilterKey = string;

// Filter option type
export type FilterOption = {
  label: string;
  value: string | number;
};

// Filter config type
export type FilterConfig<T = string, P = any, K extends FilterKey = string> = {
  key: K;
  label: string | ((param: P) => string);
  type: "select";
  getOptions: (options?: T[]) => FilterOption[];
  getValue: (props: any, param?: P) => string;
  setValue: (props: any, val: string, param?: P) => void;
};
