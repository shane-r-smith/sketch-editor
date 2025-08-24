import { Sketch } from "../domain";
import { SketchApi } from "./sketch-api";
import { sketchStore } from "../sketch.store";
import { sketchAtom } from "./sketch.state";

vi.mock("uuid", () => ({
  v6: () => "mocked-unique-id",
}));

describe("SketchApi", () => {
  let api: SketchApi;

  beforeEach(() => {
    api = new SketchApi();
  });

  describe("load", () => {
    it("sets the sketch in the store", () => {
      const sketch = new Sketch("Test", [100, 100], 60);
      api.load(sketch);

      expect(sketchStore.get(sketchAtom)).toMatchSnapshot();
    });
  });

  describe("create", () => {
    it("creates a new Sketch instance with given parameters", () => {
      const name = "MySketch";
      const size: [number, number] = [200, 150];
      const frameRate = 30;
      const sketch = api.create(name, size, frameRate);

      expect(sketch).toMatchSnapshot();
    });
  });

  describe("clear", () => {
    it("sets the sketch in the store to undefined", () => {
      const sketch = new Sketch("Test", [100, 100], 60);
      api.load(sketch);

      expect(sketchStore.get(sketchAtom)).not.toBeUndefined();

      api.clear();

      expect(sketchStore.get(sketchAtom)).toBeUndefined();
    });
  });
});
