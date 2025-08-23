import { describe, it, expect } from "vitest";
import type { CanvasElementProps } from "../canvas-element.types";
import { renderHook } from "@testing-library/react";
import { createPen, usePen } from "./pen.hooks";

// Mock props for testing
const baseProps: CanvasElementProps = {
  element: {
    key: "PEN",
    points: [0, 0, 10, 10],
    stroke: "#000000",
    strokeWidth: 10,
    strokeColourType: "HEX",
  },
  x: 5,
  y: 5,
  id: "pen",
};

describe("createPen", () => {
  it("returns correct LineConfig for pen", () => {
    const result = createPen(baseProps);
    expect(result).toMatchSnapshot();
  });
});

describe("usePen", () => {
  it("returns memoized LineConfig", () => {
    const { result } = renderHook(
      (props: CanvasElementProps) => usePen(props),
      { initialProps: baseProps }
    );
    expect(result.current).toMatchSnapshot();
  });
});
