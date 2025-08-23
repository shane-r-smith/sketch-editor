import { fireEvent, render } from "@testing-library/react";
import type { BaseColourPickerProps } from "../colour-picker.types";
import { RgbColourInput } from "./rgb-colour-input";

describe("<RgbColourInput />", () => {
  const defaultProps: BaseColourPickerProps = {
    type: "RGB",
    colour: "rgb(255, 0, 0)",
    onChange: vi.fn(),
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<RgbColourInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("converts and renders correctly and matches snapshot when provided with HEX colour", () => {
    // Arrange
    // Act
    const { container } = render(
      <RgbColourInput {...defaultProps} colour="#0000FF" />
    );

    // Assert
    const inputs = container.querySelectorAll("input")!;
    expect(inputs).toMatchSnapshot();
  });

  it("calls onChange with updated value and type red input changes", async () => {
    const { container } = render(<RgbColourInput {...defaultProps} />);

    const input = container.querySelector("input[name='red']")!;

    fireEvent.change(input, { target: { value: "0" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("rgb(0, 0, 0)", "RGB");
  });

  it("calls onChange with updated value and type green input changes", async () => {
    const { container } = render(<RgbColourInput {...defaultProps} />);

    const input = container.querySelector("input[name='green']")!;

    fireEvent.change(input, { target: { value: "255" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      "rgb(255, 255, 0)",
      "RGB"
    );
  });

  it("calls onChange with updated value and type green input changes", async () => {
    const { container } = render(<RgbColourInput {...defaultProps} />);

    const input = container.querySelector("input[name='blue']")!;

    fireEvent.change(input, { target: { value: "255" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      "rgb(255, 0, 255)",
      "RGB"
    );
  });

  it("handles invalid colour input gracefully", async () => {
    const { container } = render(<RgbColourInput {...defaultProps} />);

    const input = container.querySelector("input[name='red']")!;
    fireEvent.change(input, { target: { value: "invalid" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("rgb(0, 0, 0)", "RGB");
  });
});
