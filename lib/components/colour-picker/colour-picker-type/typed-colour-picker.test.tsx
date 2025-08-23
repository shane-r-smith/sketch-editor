import { render } from "@testing-library/react";
import { TypedColourPicker } from "./typed-colour-picker";
import { vi } from "vitest";
import type { BaseColourPickerProps } from "../colour-picker.types";

describe("<TypedColourPicker />", () => {
  const defaultProps: BaseColourPickerProps = {
    type: "HEX",
    colour: "#ff0000",
    onChange: vi.fn(),
  };

  it("renders HexColorPicker for HEX type and matches snapshot", () => {
    const { container } = render(<TypedColourPicker {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders RgbStringColorPicker for RGB type and matches snapshot", () => {
    const props: BaseColourPickerProps = {
      ...defaultProps,
      type: "RGB",
      colour: "#00ff00",
    };
    const { container } = render(<TypedColourPicker {...props} />);
    expect(container).toMatchSnapshot();
  });
});
