import React from "react";
import '@testing-library/jest-dom';
import { render, act } from "@testing-library/react";
import { useUiHint } from "./useUiHint";

function TestComponent({
  message,
  duration,
  options,
}: {
  message: React.ReactNode;
  duration?: number;
  options?: Record<string, any>;
}) {
  const hint = useUiHint(message, duration, options);
  return <>{hint}</>;
}

describe("useUiHint", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hint when message is provided", () => {
    const { getByText } = render(<TestComponent message="Hello" />);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("does not render when message is falsy", () => {
    const { queryByText } = render(<TestComponent message={null} />);
    expect(queryByText("Hello")).not.toBeInTheDocument();
  });

  it("auto-hides after duration", () => {
    const { queryByText } = render(
      <TestComponent message="Bye" duration={1000} />
    );
    expect(queryByText("Bye")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryByText("Bye")).not.toBeInTheDocument();
  });

  it("does not auto-hide if duration is 0", () => {
    const { getByText } = render(<TestComponent message="Stay" duration={0} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(getByText("Stay")).toBeInTheDocument();
  });

  it("shows again if message changes", () => {
    const { getByText, rerender } = render(
      <TestComponent message="First" duration={1000} />
    );
    expect(getByText("First")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    rerender(<TestComponent message="Second" duration={1000} />);
    expect(getByText("Second")).toBeInTheDocument();
  });

  it("applies custom style from options", () => {
    const { getByText } = render(
      <TestComponent message="Styled" options={{ style: { color: "red" } }} />
    );
    expect(getByText("Styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
