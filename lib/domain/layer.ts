import type { SketchElement } from "./sketch-element";

export const LAYER_NAME_MAX_LENGTH = 20;

export interface Layer {
  id: string;
  index: number;
  name: string;
  opacity: number;
  sketchElements: SketchElement[];

  visible: boolean;
  locked: boolean;
}
