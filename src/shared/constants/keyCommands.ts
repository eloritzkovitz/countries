import type { KeyCommand } from "@types";

export const categoryColumns = [
  ["General", "Search", "Filters"],
  ["Toolbar"],
  ["Map"],
  ["Country List"],  
];

export const keyCommands: KeyCommand[] = [
  // General
  { key: "?", modifiers: ["Shift"], action: "Show Shortcuts", category: "General" },
  { key: "Esc", modifiers: [], action: "Unfocus / Close", category: "General" },
  
  // Search
  { key: "/", modifiers: [], action: "Focus Search", category: "Search" }, 
  
  // Filters
  { key: "r", modifiers: [], action: "Reset Filters", category: "Filters" },  

  // Toolbar
  { key: "c", modifiers: [], action: "Toggle Countries Panel", category: "Toolbar" },
  { key: "e", modifiers: [], action: "Toggle Export Panel", category: "Toolbar" },
  { key: "f", modifiers: [], action: "Toggle Filters Panel", category: "Toolbar" },
  { key: "m", modifiers: [], action: "Toggle Markers Panel", category: "Toolbar" },
  { key: "o", modifiers: [], action: "Toggle Overlays Panel", category: "Toolbar" },  
  { key: "s", modifiers: [], action: "Toggle Settings Panel", category: "Toolbar" },
  { key: "u", modifiers: [], action: "Toggle UI", category: "Toolbar" },  

  // Map
  { key: "+", modifiers: [], action: "Zoom In", category: "Map" },
  { key: "-", modifiers: [], action: "Zoom Out", category: "Map" },
  { key: "0", modifiers: [], action: "Reset Zoom", category: "Map" },
  { key: "x", modifiers: [], action: "Center Map on Country", category: "Map" },

  // Country list
  { key: "ArrowUp", modifiers: [], action: "Scroll Up", category: "Country List" },
  { key: "ArrowDown", modifiers: [], action: "Scroll Down", category: "Country List" },
  { key: "Home", modifiers: [], action: "Go to First Country", category: "Country List" },
  { key: "End", modifiers: [], action: "Go to Last Country", category: "Country List" },
  { key: "PgUp", modifiers: [], action: "Scroll Up One Page", category: "Country List" },
  { key: "PgDn", modifiers: [], action: "Scroll Down One Page", category: "Country List" },
  { key: "Enter", modifiers: [], action: "Select Country", category: "Country List" },
];