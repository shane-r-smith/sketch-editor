import type { Layer } from "../../../domain";
import type { SketchElement } from "../../../domain/sketch-element";

export interface CanvasLayerProps {
  layer?: Layer;
  drawingElement?: SketchElement;
}
