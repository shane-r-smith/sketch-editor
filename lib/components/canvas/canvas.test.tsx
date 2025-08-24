import { render } from "@testing-library/react";
import { Canvas } from "./canvas";
import type { CanvasProps } from "./canvas.types";
import { vi } from "vitest";
import type { CanvasLayerProps } from "./canvas-layer";
import type { StageProps } from "react-konva";

// Mock CanvasLayer to avoid rendering actual Konva components
vi.mock("./canvas-layer", () => ({
  CanvasLayer: ({ layer, drawingElement }: CanvasLayerProps) => (
    <div data-testid="canvas-layer" data-layer-id={layer?.id}>
      {drawingElement && <div data-testid="canvas-element" />}
    </div>
  ),
}));

vi.mock("react-konva", () => ({
  Stage: ({ children }: StageProps) => (
    <div data-testid="konva-stage">{children}</div>
  ),
}));

describe("<Canvas />", () => {
  const mockRef = { current: null };
  const defaultProps: CanvasProps = {
    layers: [
      {
        id: "1",
        name: "layer 1",
        opacity: 0,
        elements: [],
        visible: false,
        locked: false,
      },
      {
        id: "2",
        name: "layer 2",
        opacity: 0,
        elements: [],
        visible: false,
        locked: false,
      },
    ],
    currentLayerIndex: 1,
    element: <div data-testid="custom-element" />,
    ref: mockRef,
    width: 400,
    height: 300,
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Canvas {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
