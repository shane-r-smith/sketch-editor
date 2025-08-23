import { describe, it, expect } from "vitest";
import { createEraser, useEraser } from "./eraser.hooks";
import type { CanvasElementProps } from "../canvas-element.types";
import { renderHook } from "@testing-library/react";

// Mock props for testing
const baseProps: CanvasElementProps = {
  element: {
    key: "ERASER",
    points: [0, 0, 10, 10],
    stroke: "#000000",
    strokeWidth: 10,
  },
  x: 5,
  y: 5,
  id: "eraser",
};

describe("createEraser", () => {
  it("returns correct LineConfig for eraser", () => {
    const result = createEraser(baseProps);
    expect(result).toMatchSnapshot();
  });
});

describe("useEraser", () => {
  it("returns memoized LineConfig", () => {
    const { result } = renderHook(
      (props: CanvasElementProps) => useEraser(props),
      { initialProps: baseProps }
    );
    expect(result.current).toMatchSnapshot();
  });
});
