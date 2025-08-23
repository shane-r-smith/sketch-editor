import { Line } from "react-konva";
import { useEraser } from "./eraser.hooks";
import type { CanvasElementProps } from "../canvas-element.types";

export function Eraser(props: CanvasElementProps) {
  const eraser = useEraser(props);

  return <Line {...eraser} />;
}
