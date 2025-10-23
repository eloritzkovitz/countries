export type Settings = {
  id: string; // always 'main' for singleton settings
  theme: 'light' | 'dark';
  projection?: string;
  borderColor?: string;
  borderWidth?: number;
};