import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColourPickerHistory } from "./colour-picker-history";

describe("<ColourPickerHistory />", () => {
  const defaultProps = {
    history: ["#ff0000", "#00ff00", "#0000ff"],
    numHistoryToShow: 3,
    onColourSelected: vi.fn(),
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ColourPickerHistory {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("shows unique colours up to numHistoryToShow", () => {
    const { container } = render(<ColourPickerHistory {...defaultProps} />);
    const boxes = container.children[0].children;
    expect(boxes.length).toBe(defaultProps.numHistoryToShow);
  });

  it("fills with undefined when not enough history", async () => {
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      history: ["#ff0000"],
      numHistoryToShow: 3,
    };

    const { container } = render(<ColourPickerHistory {...props} />);
    const boxes = container.children[0].children;
    expect(boxes.length).toBe(defaultProps.numHistoryToShow);

    // Only the first box should have a clickable colour
    await user.click(boxes[0]);
    expect(props.onColourSelected).toHaveBeenCalledWith("#ff0000");

    // Clicking empty boxes should not call onColourSelected
    await user.click(boxes[1]);
    await user.click(boxes[2]);
    expect(props.onColourSelected).toHaveBeenCalledTimes(1);
  });
});
