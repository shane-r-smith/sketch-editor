import type { Sketch } from "../domain";

export interface ISketchApi {
  load: (sketch: Sketch) => void;
  create: (name: string, size: [number, number], frameRate: number) => Sketch;
  clear: () => void;
}
