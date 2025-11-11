import { useLayoutEffect, useState, type RefObject } from "react";

export function useMenuPosition<T extends HTMLElement>(
  open: boolean,
  btnRef: RefObject<T | null>,
  menuRef: RefObject<T | null>
) {
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (open && btnRef.current && menuRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - btnRect.bottom;
      const spaceAbove = btnRect.top;

      let top = btnRect.top + window.scrollY;
      let left = btnRect.left - menuRect.width + window.scrollX;

      // Flip above if not enough space below
      if (spaceBelow < menuRect.height && spaceAbove > menuRect.height) {
        top = btnRect.top - menuRect.height + window.scrollY;
      }

      setMenuStyle({
        position: "absolute",
        top,
        left,
        zIndex: 1000,
      });
    } else {
      setMenuStyle({});
    }
  }, [open]);

  return menuStyle;
}
