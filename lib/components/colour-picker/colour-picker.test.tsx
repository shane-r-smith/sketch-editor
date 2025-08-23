import { render } from "@testing-library/react";
import { ColourPicker } from "./colour-picker";
import type { ColourPickerProps } from "./colour-picker.types";
import userEvent from "@testing-library/user-event";

describe("<ColourPicker />", () => {
  const defaultProps: ColourPickerProps = {
    colour: "#ff0000",
    type: "HEX",
    history: ["#ff0000", "#00ff00", "#0000ff"],
    numHistoryToShow: 3,
    onColourSelected: vi.fn(),
    onChange: vi.fn(),
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ColourPicker {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("calls onChange when colour input changes", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    const { getByDisplayValue } = render(<ColourPicker {...defaultProps} />);
    const input = getByDisplayValue(defaultProps.colour);
    await user.clear(input);
    await user.type(input, "#123456");

    // Assert
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
