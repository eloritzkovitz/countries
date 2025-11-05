// Key command type definition
export type KeyCommand = {
  key: string;
  modifiers: string[];
  action: string;
  category: string;
};

// Modifier keys type definition
export type ModifierKeys = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
};

// Key handler function type definition
export type KeyHandler = (event: KeyboardEvent) => void;
