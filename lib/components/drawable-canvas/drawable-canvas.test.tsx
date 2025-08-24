import { render } from "@testing-library/react";
import { DrawableCanvas } from "./drawable-canvas";
import type { DrawableCanvasProps } from "./drawable-canvas.types";
import { vi } from "vitest";

// Mock Canvas and useDrawing
vi.mock("../canvas", () => ({
  Canvas: (props: any) => (
    <div data-testid="canvas">{JSON.stringify(props, undefined, 2)} </div>
  ),
}));
vi.mock("./drawable-canvas.hooks", () => ({
  useDrawing: vi.fn(() => ({ drawingProp: "test" })),
}));

describe("<DrawableCanvas />", () => {
  const baseProps: DrawableCanvasProps = {
    width: 300,
    height: 150,
    disabled: false,
    ref: null,
    tool: {
      tool: "PEN",
      icon: "pen",
      stroke: "#FF0000",
      strokeWidth: 5,
      strokeColourType: "HEX",
      strokeColourHistory: [],
    },
    currentLayerIndex: 0,
    onDraw: () => {},
    layers: [],
  };

  it("matches snapshot when enabled", () => {
    const { container } = render(<DrawableCanvas {...baseProps} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when disabled", () => {
    const props = { ...baseProps, disabled: true };
    const { container } = render(<DrawableCanvas {...props} />);
    expect(container).toMatchSnapshot();
  });
});
