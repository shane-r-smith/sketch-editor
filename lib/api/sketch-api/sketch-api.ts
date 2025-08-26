import { Sketch } from "../../domain";
import type { ISketchApi } from "./sketch-api.types";
import { sketchAtom } from "./sketch-api.state";
import { sketchStore } from "../../sketch.store";
import { EventsApi } from "../events-api";

export class SketchApi extends EventsApi implements ISketchApi {
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
