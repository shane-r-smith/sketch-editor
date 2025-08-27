import { Page } from "./page";
import { v6 as uuidv6 } from "uuid";

export interface SketchMetadata {
  id: string;
  name: string;
  size: [number, number];
  created: string;
  edited: string;
  frameRate: number;
}

export class Sketch implements SketchMetadata {
  id: string = uuidv6();
  created: string = new Date().toISOString();
  edited: string = new Date().toISOString();
  pages: Page[] = [new Page()];

  name: string;
  size: [number, number];
  frameRate: number;

  constructor(name: string, size: [number, number], frameRate: number) {
    this.name = name;
    this.size = size;
    this.frameRate = frameRate;
  }
}
