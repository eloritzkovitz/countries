import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface UiHintOptions {
  style?: React.CSSProperties;
  key?: string | number;
}

export function useUiHint(
  message: ReactNode,
  duration = 4000,
  options: UiHintOptions = {}
) {
  const [visible, setVisible] = useState(!!message);

  // Reset visibility when message changes
  useEffect(() => {
    setVisible(!!message);
  }, [message, options.key]);

  // Hide the hint after the specified duration
  useEffect(() => {
    if (!visible || !duration) return;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration, visible]);

  // Don't render anything if not visible or no message
  if (!visible || !message) return null;

  return (
    <div
      className="fixed px-6 py-3 rounded-lg shadow-lg z-[1000] text-base pointer-events-none bg-gray-800 text-gray-100"
      style={{
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        ...options.style,
      }}
    >
      {message}
    </div>
  );
}
