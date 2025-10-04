import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { useOverlayContext } from "../context/OverlayContext";

export function OverlayToggles() {
  const { overlays, toggleOverlayVisibility, loading, error } = useOverlayContext();

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
        marginBottom: "1rem",
      }}
    >
      <h2>Overlays</h2>
      {overlays.map((overlay) => (
        <label
          key={overlay.id}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <input
            type="checkbox"
            checked={overlay.visible}
            onChange={() => toggleOverlayVisibility(overlay.id)}
          />
          <span
            style={{
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: overlay.color,
              marginRight: 6,
              border: "2px solid #ccc",
            }}
          />
          {overlay.name}
        </label>
      ))}
    </div>
  );
}
