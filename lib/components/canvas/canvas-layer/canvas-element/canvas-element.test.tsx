import { render } from "@testing-library/react";
import { vi } from "vitest";
import { CanvasElement } from "./canvas-element";
import type { CanvasElementProps } from "./canvas-element.types";
import type { SketchElement } from "../../../../domain";

// Mock Pen and Eraser components
vi.mock("./pen", () => ({
  Pen: (props: CanvasElementProps) => (
    <div data-testid="pen">{JSON.stringify(props, undefined, 2)}</div>
  ),
}));
vi.mock("./eraser", () => ({
  Eraser: (props: CanvasElementProps) => (
    <div data-testid="eraser">{JSON.stringify(props, undefined, 2)}</div>
  ),
}));

describe("<CanvasElement />", () => {
  const baseProps: Omit<CanvasElementProps, "element"> = {};

  const baseElement: Omit<SketchElement, "key"> = {
    points: [0, 0, 10, 10],
    stroke: "#000000",
    strokeWidth: 2,
  };

  it("renders Pen when element.key is 'PEN'", () => {
    const element: SketchElement = {
      ...baseElement,
      key: "PEN",
      strokeColourType: "HEX",
    };
    const { container } = render(
      <CanvasElement element={element} {...baseProps} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders Eraser when element.key is 'ERASER'", () => {
    const element: SketchElement = {
      ...baseElement,
      key: "ERASER",
    };
    const { container } = render(
      <CanvasElement element={element} {...baseProps} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders null for unknown element.key", () => {
    const element = { key: "UNKNOWN" } as unknown as SketchElement;
    const { container } = render(
      <CanvasElement element={element} {...baseProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
