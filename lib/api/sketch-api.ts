import { Sketch } from "../domain";
import type { ISketchApi } from "./sketch-api.types";
import { sketchAtom } from "./sketch.state";
import { sketchStore } from "../sketch.store";

export class SketchApi implements ISketchApi {
  public load(sketch: Sketch): void {
    sketchStore.set(sketchAtom, sketch);
  }

  public create(name: string, size: [number, number], frameRate: number) {
    return new Sketch(name, size, frameRate);
  }

  public clear() {
    sketchStore.set(sketchAtom, undefined);
  }
}
