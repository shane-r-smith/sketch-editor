import type { StageProps } from "react-konva";
import type { SketchElement } from "../../domain/sketch-element";
import type { Layer } from "../../domain";
import type { Stage } from "konva/lib/Stage";
import type { Ref } from "react";

export interface CanvasProps extends CanvasApi {
  drawingElement?: SketchElement;
  currentLayerIndex?: number;
  layers: Layer[];

  ref: Ref<Stage>;
}

export interface CanvasApi extends Omit<StageProps, "width" | "height"> {
  width: number;
  height: number;
}
