import type { Sketch } from "../../domain";
import type { IEventsApi } from "../events-api";

export interface ISketchApi extends IEventsApi {
  load: (sketch: Sketch) => void;
  create: (name: string, size: [number, number], frameRate: number) => Sketch;
  clear: () => void;
}
