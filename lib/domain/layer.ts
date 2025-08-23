import type { SketchElement } from "./sketch-element";

export const LAYER_NAME_MAX_LENGTH = 20;

export interface Layer {
  id: string;
  name: string;
  opacity: number;
  elements: SketchElement[];

  visible: boolean;
  locked: boolean;
}
