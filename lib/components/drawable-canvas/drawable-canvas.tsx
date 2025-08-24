import type { DrawableCanvasProps } from "./drawable-canvas.types";
import { Canvas } from "../canvas";
import { useDrawing } from "./drawable-canvas.hooks";

export function DrawableCanvas(props: DrawableCanvasProps) {
  const drawing = useDrawing(props);

  if (props.disabled) {
    /** If disabled, render non-drawable version of the canvas */
    return <Canvas {...props} />;
  }

  return <Canvas {...props} {...drawing} />;
}
