// Key type definition
export type Key =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Esc"
  | "Tab"
  | "Backspace"
  | "Delete"
  | "Home"
  | "End"
  | "PgUp"
  | "PgDn"
  | "+"
  | "-"
  | "0"
  | "?"
  | "/"
  | " ";

// Modifier type definition
export type Modifier = "Ctrl" | "Alt" | "Shift" | "Meta";

// Key command type definition
export type KeyCommand = {
  key: Key;
  modifiers: Modifier[];
  action: string;
  category: string;
};

// Key handler function type definition
export type KeyHandler = (event: KeyboardEvent) => void;
