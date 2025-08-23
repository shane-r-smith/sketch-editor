import type { EraserTool, PenTool } from "./tool";

export type SketchElement = PenSketchElement | EraserSketchElement;

export interface PenSketchElement extends PenTool {
  points: number[];
}

export interface EraserSketchElement extends EraserTool {
  points: number[];
}
