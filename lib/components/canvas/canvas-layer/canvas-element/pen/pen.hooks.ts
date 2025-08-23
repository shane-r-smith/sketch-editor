import type { LineConfig } from "konva/lib/shapes/Line";
import { useMemo } from "react";
import type { CanvasElementProps } from "../canvas-element.types";

export const createPen = ({
  element,
  ...rest
}: CanvasElementProps): LineConfig => ({
  ...rest,
  ...element,
  tension: 0.5,
  lineCap: "round",
  lineJoin: "round",
  globalCompositeOperation: "source-over",
});

export const usePen = (props: CanvasElementProps): LineConfig => {
  return useMemo<LineConfig>(() => {
    return createPen(props);
  }, [props]);
};
