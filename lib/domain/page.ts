import { Layer } from "./layer";
import { v6 as uuidv6 } from "uuid";

export class Page {
  id: string = uuidv6();
  layers: Layer[] = [new Layer(1)];
}
