import { render } from "@testing-library/react";
import { vi } from "vitest";
import { ColourInput } from "./colour-input";
import type { BaseColourPickerProps } from "../colour-picker.types";

vi.mock("./hex-colour-input", () => ({
  HexColourInput: (props: BaseColourPickerProps) => (
    <div>{JSON.stringify(props, undefined, 2)}</div>
  ),
}));
vi.mock("./rgb-colour-input", () => ({
  RgbColourInput: (props: BaseColourPickerProps) => (
    <div>{JSON.stringify(props, undefined, 2)}</div>
  ),
}));

describe("<ColourInput />", () => {
  const baseProps: BaseColourPickerProps = {
    colour: "#ff0000",
    onChange: vi.fn(),
    type: "HEX" as const,
  };

  it("renders HexColourInput when type is HEX", () => {
    const { container } = render(<ColourInput {...baseProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders RgbColourInput when type is RGB", () => {
    const props = { ...baseProps, type: "RGB" as const };
    const { container } = render(<ColourInput {...props} />);
    expect(container).toMatchSnapshot();
  });
});
