import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ColourPickerType } from "./colour-picker-type";
import type { ColourType } from "../colour-picker.types";

describe("<ColourPickerType />", () => {
  const defaultProps = {
    colour: "#ff0000",
    type: "HEX" as ColourType,
    onChange: vi.fn(),
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ColourPickerType {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("shows HEX and RGB options", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    const { getByRole, getAllByRole } = render(
      <ColourPickerType {...defaultProps} />
    );

    const select = getByRole("combobox");
    await user.click(select);

    // Assert
    const options = getAllByRole("option");
    expect(options.map((opt) => opt.textContent)).toEqual(["HEX", "RGB"]);
  });

  it("calls onChange with correct arguments when selecting RGB", async () => {
    // Arrange
    const user = userEvent.setup();
    const onChange = vi.fn();

    // Act
    const { getByRole, getByText } = render(
      <ColourPickerType {...defaultProps} onChange={onChange} />
    );

    const select = getByRole("combobox");
    await user.click(select);
    await user.click(getByText("RGB"));

    // Assert
    expect(onChange).toHaveBeenCalledWith(defaultProps.colour, "RGB");
  });

  it("calls onChange with correct arguments when selecting HEX", async () => {
    // Arrange
    const user = userEvent.setup();
    const onChange = vi.fn();

    // Act
    const { getByRole, getByText } = render(
      <ColourPickerType {...defaultProps} type="RGB" onChange={onChange} />
    );

    const select = getByRole("combobox");
    await user.click(select);
    await user.click(getByText("HEX"));

    // Assert
    expect(onChange).toHaveBeenCalledWith(defaultProps.colour, "HEX");
  });
});
