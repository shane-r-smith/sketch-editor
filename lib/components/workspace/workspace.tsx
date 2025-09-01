import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addElementAtom,
  currentLayerIndexAtom,
  currentLayersAtom,
  sketchAtom,
} from "../../api/sketch-api/sketch-api.state";
import { DrawableCanvas } from "../drawable-canvas";
import { useCallback, useRef, useState } from "react";
import type { Stage } from "konva/lib/Stage";
import type { DrawingState, SketchElement } from "../../domain";
import { drawingAtom } from "../../api/drawing-api";
import { publish } from "../../api/events-api";
import Stack from "@mui/material/Stack";
import { selectedToolAtom } from "../../api/tools-api";
import { Cursor } from "../cursor";
import { colord } from "colord";

export function Workspace() {
  const [tool, setTool] = useAtom(selectedToolAtom);
  const sketch = useAtomValue(sketchAtom);
  const layers = useAtomValue(currentLayersAtom);
  const currentLayerIndex = useAtomValue(currentLayerIndexAtom);
  const addElement = useSetAtom(addElementAtom);

  const setDrawing = useSetAtom(drawingAtom);

  const canvasRef = useRef<Stage>(null);
  const [showCursor, setShowCursor] = useState(false);

  const _handleDraw = (element: SketchElement) => {
    // Add to store
    addElement(element);

    // Call editor change events
    publish("SKETCH");

    // Update stroke history
    if ("strokeColourHistory" in tool) {
      const hasCurrentColourInHistory = tool.strokeColourHistory
        .filter((x) => x)
        .map((x) => colord(x).toRgbString())
        .includes(colord(tool.stroke).toRgbString());

      if (!hasCurrentColourInHistory) {
        const oldHistory = tool.strokeColourHistory.slice(0, 18);
        setTool({ strokeColourHistory: [tool.stroke, ...oldHistory] });

        publish("TOOL");
      }
    }
  };

  const _handleDrawing = useCallback(
    (drawingState: DrawingState) => {
      setDrawing(drawingState);
    },
    [setDrawing]
  );

  if (!sketch || !layers) {
    return <div>Loading...</div>;
  }

  return (
    <Stack
      width="100%"
      height="100%"
      bgcolor="grey.200"
      overflow="auto"
      onMouseEnter={() => {
        setShowCursor(true);
      }}
      onMouseLeave={() => {
        setShowCursor(false);
      }}
    >
      {showCursor ? <Cursor /> : null}
      <Stack
        direction="row"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        bgcolor="grey.20"
        role="presentation"
      >
        <DrawableCanvas
          ref={canvasRef}
          tool={tool}
          layers={layers}
          currentLayerIndex={currentLayerIndex}
          onDraw={_handleDraw}
          onDrawing={_handleDrawing}
          width={sketch.size[0]}
          height={sketch.size[1]}
          style={{
            backgroundColor: "white",
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          }}
        />
      </Stack>
    </Stack>
  );
}
