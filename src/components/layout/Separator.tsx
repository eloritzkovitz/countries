import React from "react";

export function Separator({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`separator ${className}`}
      style={style}
    />
  );
}