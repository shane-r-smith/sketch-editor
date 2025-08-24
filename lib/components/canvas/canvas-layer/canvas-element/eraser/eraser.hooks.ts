import type { LineConfig } from "konva/lib/shapes/Line";
import { useMemo } from "react";
import type { CanvasElementProps } from "../canvas-element.types";

export const createEraser = ({
  element,
  ...rest
}: CanvasElementProps): LineConfig => ({
  ...rest,
  ...element,
  tension: 0.5,
  lineCap: "round",
  lineStroke: "round",
  globalCompositeOperation: "destination-out",
});

export const useEraser = (props: CanvasElementProps): LineConfig => {
  return useMemo<LineConfig>(() => {
    return createEraser(props);
  }, [props]);
};
