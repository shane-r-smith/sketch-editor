import { fireEvent, render } from "@testing-library/react";
import { HexColourInput } from "./hex-colour-input";
import type { BaseColourPickerProps } from "../colour-picker.types";

describe("<HexColourInput />", () => {
  const defaultProps: BaseColourPickerProps = {
    type: "HEX",
    colour: "#ff0000",
    onChange: vi.fn(),
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<HexColourInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("calls onChange with updated value and type when input changes", async () => {
    const { container } = render(<HexColourInput {...defaultProps} />);

    const input = container.querySelector("input")!;

    fireEvent.change(input, { target: { value: "#00ff00" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith("#00ff00", "HEX");
  });

  it("handles invalid colour input gracefully", async () => {
    const { container } = render(<HexColourInput {...defaultProps} />);

    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "invalid" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("invalid", "HEX");
  });
});
