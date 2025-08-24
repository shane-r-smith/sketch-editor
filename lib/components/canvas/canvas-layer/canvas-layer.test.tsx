import { render } from "@testing-library/react";
import { CanvasLayer } from "./canvas-layer";
import type { CanvasLayerProps } from "./canvas-layer.types";
import { vi } from "vitest";
import type { CanvasElementProps } from "./canvas-element";
import type { LayerConfig } from "konva/lib/Layer";
import type { Layer } from "../../../domain";

// Mock CanvasElement and KonvaLayer
vi.mock("./canvas-element", () => ({
  CanvasElement: (props: CanvasElementProps) => (
    <div data-testid="canvas-element">
      {JSON.stringify(props, undefined, 2)}
    </div>
  ),
}));

vi.mock("react-konva", () => ({
  Layer: ({ children, opacity }: LayerConfig) => (
    <div data-testid="konva-layer" data-opacity={opacity}>
      {children}
    </div>
  ),
}));

describe("<CanvasLayer />", () => {
  const layer: Layer = {
    id: "layer-1",
    name: "layer-1",
    opacity: 1,
    elements: [
      {
        tool: "PEN",
        points: [0, 0, 10, 10],
        stroke: "#000000",
        strokeWidth: 2,
        strokeColourType: "HEX",
      },
      {
        tool: "PEN",
        points: [0, 10, 10, 0],
        stroke: "#000000",
        strokeWidth: 2,
        strokeColourType: "HEX",
      },
      {
        tool: "ERASER",
        points: [0, 10, 10, 0],
        stroke: "#000000",
        strokeWidth: 2,
      },
    ],
    visible: true,
    locked: false,
  };

  const defaultProps: CanvasLayerProps = {
    layer: layer,
    index: 0,
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<CanvasLayer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders null if layer.visible is false", () => {
    const { container } = render(
      <CanvasLayer
        layer={{ ...layer, visible: false }}
        index={0}
        drawingElement={undefined}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the drawing element", () => {
    const { getAllByTestId } = render(
      <CanvasLayer
        {...defaultProps}
        drawingElement={{
          tool: "PEN",
          points: [5, 5, 15, 15],
          stroke: "#FF00FF",
          strokeWidth: 3,
          strokeColourType: "HEX",
        }}
      />
    );
    const elements = getAllByTestId("canvas-element");
    // 3 from layer.elements + 1 from prop 'element'
    expect(elements).toHaveLength(4);
    expect(elements[3]).toMatchSnapshot();
  });
});
