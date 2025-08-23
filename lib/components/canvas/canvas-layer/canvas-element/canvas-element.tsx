import { Eraser } from "./eraser";
import { Pen } from "./pen";
import type { CanvasElementProps } from "./canvas-element.types";

export function CanvasElement({ element, ...rest }: CanvasElementProps) {
  switch (element.tool) {
    case "PEN":
      return <Pen element={element} {...rest} />;
    case "ERASER":
      return <Eraser element={element} {...rest} />;
    default:
      return null;
  }
}
