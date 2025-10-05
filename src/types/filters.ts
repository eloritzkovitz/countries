import type { SovereigntyType } from "./country";
import type { Overlay } from "./overlay";

// Filter option type
export type FilterOption = {
  label: string;
  value: string;
};

// Filter configuration type
export type FilterConfig =
  | {
      key: "region";
      label: string;
      type: "select";
      getOptions: (allRegions: string[]) => { value: string; label: string }[];
      getValue: (props: any) => string;
      setValue: (props: any, val: string) => void;
    }
  | {
      key: "subregion";
      label: string;
      type: "select";
      getOptions: (
        subregionOptions: string[]
      ) => { value: string; label: string }[];
      getValue: (props: any) => string;
      setValue: (props: any, val: string) => void;
    }
  | {
      key: "sovereignty";
      label: string;
      type: "select";
      getOptions: (sovereigntyOptions: SovereigntyType[]) => FilterOption[];
      getValue: (props: any) => string;
      setValue: (props: any, val: string) => void;
    }
  | {
      key: "overlay";
      label: (overlay: Overlay) => string;
      type: "select";
      getOptions: () => { value: string; label: string }[];
      getValue: (props: any, overlay: Overlay) => string;
      setValue: (props: any, val: string, overlay: Overlay) => void;
    };
