import type { SketchElement } from "./sketch-element";
import { v6 as uuidv6 } from "uuid";

export const LAYER_NAME_MAX_LENGTH = 20;

export class Layer {
  id: string = uuidv6();
  opacity: number = 1;
  elements: SketchElement[] = [];
  visible: boolean = true;
  locked: boolean = false;

  name: string;

  constructor(index: number) {
    this.name = `Layer ${index}`;
  }
}
