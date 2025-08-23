import { render } from "@testing-library/react";
import { Eraser } from "./eraser";
import type { CanvasElementProps } from "../canvas-element.types";
import { vi } from "vitest";
import type { LineConfig } from "konva/lib/shapes/Line";

vi.mock("react-konva", () => ({
  Line: (props: LineConfig) => (
    <div id="mocked-line">{JSON.stringify(props, undefined, 2)}</div>
  ),
}));

describe("<Eraser />", () => {
  const defaultProps: CanvasElementProps = {
    element: {
      key: "PEN",
      points: [0, 0, 100, 100],
      stroke: "#000000",
      strokeWidth: 10,
      strokeColourType: "HEX",
    },
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Eraser {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
