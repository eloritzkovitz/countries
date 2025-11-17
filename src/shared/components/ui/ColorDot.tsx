interface ColorDotProps {
  color: string;
  size?: number;
}

export function ColorDot({ color, size = 14 }: ColorDotProps) {
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        border: "none",
      }}
    />
  );
}
