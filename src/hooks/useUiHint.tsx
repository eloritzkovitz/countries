import { useEffect, useState } from "react";

export function useUiHint(message: string, duration = 4000) {
  const [visible, setVisible] = useState(true);

  // Hide the hint after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? (
    <div
      className="fixed px-6 py-3 rounded-lg shadow-lg z-[1000] text-base pointer-events-none bg-gray-800 text-gray-100"
      style={{
        bottom: 80,
        left: "87%",
        transform: "translateX(-50%)",
      }}
    >
      {message}
    </div>
  ) : null;
}