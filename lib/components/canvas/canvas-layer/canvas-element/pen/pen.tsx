import { Line } from "react-konva";
import { usePen } from "./pen.hooks";
import type { CanvasElementProps } from "../canvas-element.types";

export function Pen(props: CanvasElementProps) {
  const pen = usePen(props);

  return <Line {...pen} />;
}
