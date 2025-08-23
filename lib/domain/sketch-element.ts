import type { EraserTool, PenTool } from "./tool";

export type SketchElement = PenSketchElement | EraserSketchElement;

export interface PenSketchElement
  extends Omit<PenTool, "icon" | "strokeColourHistory"> {
  points: number[];
}

export interface EraserSketchElement extends Omit<EraserTool, "icon"> {
  points: number[];
}
