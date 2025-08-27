import { render } from "@testing-library/react";
import { SketchEditor } from "./sketch-editor";

describe("<SketchEditor />", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <SketchEditor>
        <div>Workspace</div>
      </SketchEditor>
    );
    expect(container).toMatchSnapshot();
  });
});
