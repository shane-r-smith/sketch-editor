import { render } from "@testing-library/react";
import type { CanvasElementProps } from "../canvas-element.types";
import { vi } from "vitest";
import type { LineConfig } from "konva/lib/shapes/Line";
import { Pen } from "./pen";

vi.mock("react-konva", () => ({
  Line: (props: LineConfig) => (
    <div id="mocked-line">{JSON.stringify(props, undefined, 2)}</div>
  ),
}));

describe("<Pen />", () => {
  const defaultProps: CanvasElementProps = {
    element: {
      key: "PEN",
      points: [0, 0, 100, 100],
      stroke: "#00FF00",
      strokeWidth: 10,
      strokeColourType: "HEX",
    },
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Pen {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
