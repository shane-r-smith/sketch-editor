import type { SketchElement } from "../../../domain";
import { CanvasElement } from "./canvas-element";
import type { CanvasLayerProps } from "./canvas-layer.types";
import { Layer as KonvaLayer } from "react-konva";

export function CanvasLayer({
  layer,
  index,
  drawingElement,
}: CanvasLayerProps) {
  if (!layer.visible) {
    return null;
  }

  return (
    <KonvaLayer opacity={layer.opacity}>
      {layer.elements.map((element: SketchElement, i) => (
        <CanvasElement
          key={i}
          element={element}
          offsetY={index}
          opacity={layer.opacity}
        />
      ))}
      {drawingElement && (
        <CanvasElement
          element={drawingElement}
          offsetY={index}
          opacity={layer.opacity}
        />
      )}
    </KonvaLayer>
  );
}
