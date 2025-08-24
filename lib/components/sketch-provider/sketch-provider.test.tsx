import { render } from "@testing-library/react";
import { SketchProvider } from "./sketch-provider";

describe("<SketchProvider />", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <SketchProvider>
        <div>Test Child</div>
      </SketchProvider>
    );
    expect(getByText("Test Child")).toMatchSnapshot();
  });
});
