import { Stage } from "react-konva";
import type { CanvasProps } from "./canvas.types";
import { CanvasLayer } from "./canvas-layer";

export function Canvas({
  layers,
  currentLayerIndex,
  drawingElement,
  ref,
  ...rest
}: CanvasProps) {
  return (
    <>
      <Stage {...rest} ref={ref}>
        {layers.map((layer, index) => (
          <CanvasLayer
            key={`layer_${layer.id}`}
            layer={layer}
            index={index}
            drawingElement={
              currentLayerIndex === index ? drawingElement : undefined
            }
          />
        ))}
      </Stage>
    </>
  );
}
