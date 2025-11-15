import { render, act } from "@testing-library/react";
import React, { useState } from "react";
import { useUiToggleHint } from "./useUiToggleHint";
import { FaEye, FaEyeSlash } from "react-icons/fa";

describe("useUiToggleHint", () => {
  let stateRef: React.MutableRefObject<any>;

  beforeEach(() => {
    vi.useFakeTimers();
    stateRef = { current: {} };
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function renderWithState(initialVisible: boolean) {
    function Wrapper() {
      const [visible, setUiVisible] = useState(initialVisible);
      const [key, setHintKey] = useState(0);
      const [message, setHintMessage] = useState<React.ReactNode>(null);
      stateRef.current = { visible, key, message };
      useUiToggleHint(visible, setUiVisible, setHintKey, setHintMessage);
      return null;
    }
    render(<Wrapper />);
  }

  it("does not show a hint on initial mount, even if hidden", () => {
    renderWithState(false);
    expect(stateRef.current.visible).toBe(false);
    expect(stateRef.current.key).toBe(0);
    expect(stateRef.current.message).toBe(null);
  });

  it("shows the hidden hint only when toggling from visible to hidden", () => {
    renderWithState(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "u" }));
    });

    expect(stateRef.current.visible).toBe(false);
    expect(stateRef.current.key).toBe(1);
    expect(stateRef.current.message).toEqual(
      <span>
        <FaEyeSlash className="inline mr-2" />
        UI hidden. Press U to show the UI.
      </span>
    );
  });

  it("shows the shown hint only when toggling from hidden to visible", () => {
    renderWithState(false);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "u" }));
    });

    expect(stateRef.current.visible).toBe(true);
    expect(stateRef.current.key).toBe(1);
    expect(stateRef.current.message).toEqual(
      <span>
        <FaEye className="inline mr-2" />
        UI shown. Press U to hide the UI.
      </span>
    );
  });

  it("does not toggle when typing in input", () => {
    renderWithState(true);

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    Object.defineProperty(document, "activeElement", {
      configurable: true,
      get: () => input,
    });

    act(() => {
      input.dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "u", bubbles: true })
      );
    });

    expect(stateRef.current.visible).toBe(true);
    expect(stateRef.current.key).toBe(0);
    expect(stateRef.current.message).toBe(null);

    document.body.removeChild(input);
  });

  it("does not toggle or update hint on irrelevant key", () => {
    renderWithState(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "x" }));
    });

    expect(stateRef.current.visible).toBe(true);
    expect(stateRef.current.key).toBe(0);
    expect(stateRef.current.message).toBe(null);
  });
});
