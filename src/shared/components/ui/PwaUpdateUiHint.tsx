import { useRegisterSW } from "virtual:pwa-register/react";
import { useUiHint } from "@hooks/useUiHint";

export function PwaUpdateUiHint() {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  useUiHint(
    needRefresh ? (
      <span>
        New update available.&nbsp;
        <button className="underline" onClick={() => updateServiceWorker(true)}>
          Reload
        </button>
      </span>
    ) : (
      ""
    ),
    0,
    { key: "pwa-update" }
  );

  return null;
}
