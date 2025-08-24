import type { LineConfig } from "konva/lib/shapes/Line";
import type { SketchElement } from "../../../../domain/sketch-element";

export interface CanvasElementProps extends LineConfig {
  element: SketchElement;
}
