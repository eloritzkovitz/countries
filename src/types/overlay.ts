// Overlay type definition
export type Overlay = {
  id: string;
  name: string;
  color: string;
  countries: string[];
  tooltip?: string;
  visible: boolean;
};

// Overlay item type definition
export type OverlayItem = {
  isoCode: string;
  color?: string;
  tooltip?: string;
  style?: React.CSSProperties;
};

// Overlay context type definition
export type OverlayContextType = {
  overlays: Overlay[];
  setOverlays: React.Dispatch<React.SetStateAction<Overlay[]>>;
  addOverlay: (overlay: Overlay) => void;
  editOverlay: (overlay: Overlay) => void;
  removeOverlay: (id: string) => void;
  toggleOverlayVisibility: (id: string) => void;
  loading: boolean;
  error: string | null;
  editingOverlay: Overlay | null;
  isEditModalOpen: boolean;
  isNewOverlay: boolean;
  openAddOverlay: () => void;
  openEditOverlay: (overlay: Overlay) => void;
  saveOverlay: () => void;
  closeOverlayModal: () => void;
  setEditingOverlay: React.Dispatch<React.SetStateAction<Overlay | null>>;
};