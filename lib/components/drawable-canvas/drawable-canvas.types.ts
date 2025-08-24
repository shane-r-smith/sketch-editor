import type { Layer, SketchElement, Tool } from "../../domain";
import type { Stage } from "konva/lib/Stage";
import type { Ref } from "react";
import type { CanvasApi } from "../canvas";
import type { KonvaNodeEvents } from "react-konva";

export interface DrawingState {
  isDrawing: boolean;
  hasLeftWhileDrawing?: boolean;
}

export interface DrawableCanvasProps extends DrawableCanvasApi {
  ref: Ref<Stage>;
}

export interface DrawableCanvasApi extends CanvasApi {
  tool: Tool;
  currentLayerIndex: number;
  onDraw: (element: SketchElement) => void;
  onDrawing?: (state: DrawingState) => void;
  layers: Layer[];

  disabled?: boolean;
}

export interface Drawing
  extends Pick<
    KonvaNodeEvents,
    | "onMouseDown"
    | "onMouseMove"
    | "onMouseUp"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onTouchStart"
    | "onTouchMove"
    | "onTouchEnd"
  > {
  drawingElement?: SketchElement;
}
