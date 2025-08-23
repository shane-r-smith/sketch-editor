import { Stage } from "react-konva";
import type { CanvasProps } from "./canvas.types";
import { CanvasLayer } from "./canvas-layer";

export function Canvas({
  layers,
  layerIndex,
  element,
  ref,
  ...rest
}: CanvasProps) {
  return (
    <>
      <Stage {...rest} ref={ref}>
        {layers.map((layer) => (
          <CanvasLayer
            key={`layer_${layer.id}`}
            layer={layer}
            element={layerIndex === layer.index ? element : undefined}
          />
        ))}
      </Stage>
    </>
  );
}
