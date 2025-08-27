import { useEffect, useMemo, useState } from "react";
import type { DrawableCanvasApi, Drawing } from "./drawable-canvas.types";
import type { DrawingState, SketchElement } from "../../domain";
import type { KonvaEventObject } from "konva/lib/Node";

const getSafeExitPosition = (
  position: number,
  min: number,
  max: number
): number => {
  if (position < min) {
    return min;
  }

  if (position > max) {
    return max;
  }

  return position;
};

export const useDrawing = ({
  tool,
  width,
  height,
  onDrawing,
  onDraw,
  disabled,
}: DrawableCanvasApi): Drawing => {
  const [drawingElement, setDrawingElement] = useState<SketchElement>();
  const [drawingState, setDrawingState] = useState<DrawingState>({
    isDrawing: false,
    hasLeftCanvasWhileDrawing: false,
  });

  const mouseUpOutsideListener = useMemo(() => {
    return () => {
      setDrawingElement(undefined);
      setDrawingState({ isDrawing: false, hasLeftCanvasWhileDrawing: false });
      window.removeEventListener("mouseup", mouseUpOutsideListener); // Clean-up
    };
  }, []);

  useEffect(
    /**
     * Effect to call the `onDrawing` property when `isDrawing` toggles.
     */
    () => {
      if (!onDrawing) {
        return;
      }

      onDrawing(drawingState);
    },
    [onDrawing, drawingState]
  );

  if (disabled) {
    return {};
  }

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 1) {
      return;
    }

    const pos = e?.target?.getStage()?.getPointerPosition();
    setDrawingState({
      isDrawing: true,
    });

    setDrawingElement({
      ...tool,
      points: pos ? [pos.x, pos.y] : [],
    });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // No drawing - skipping
    if (!drawingState.isDrawing) {
      return;
    }

    if (!drawingElement) {
      return;
    }

    const stage = e.target.getStage();

    if (!stage) {
      return;
    }

    const point = stage.getPointerPosition();

    if (!point) {
      return;
    }

    setDrawingElement({
      ...drawingElement,
      points: drawingElement.points.concat([point.x, point.y]),
    });
  };

  const handleMouseUp = () => {
    if (!drawingElement) {
      setDrawingElement(undefined);
      setDrawingState({
        isDrawing: false,
      });
      return;
    }

    onDraw(drawingElement);

    setDrawingElement(undefined);
    setDrawingState({
      isDrawing: false,
    });
  };

  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawingState.hasLeftCanvasWhileDrawing) {
      return;
    }

    // User reentered without lifting the mouse up. Remove event listener (reset to normal drawing state)
    window.removeEventListener("mouseup", mouseUpOutsideListener);

    // Renter drawing state
    setDrawingState({ isDrawing: true, hasLeftCanvasWhileDrawing: false });
    const pos = e?.target?.getStage()?.getPointerPosition();

    setDrawingElement({
      ...tool,
      points: pos ? [pos.x, pos.y] : [],
    });
  };

  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawingState.isDrawing || !drawingElement) {
      return;
    }

    setDrawingState({ isDrawing: false, hasLeftCanvasWhileDrawing: true });

    // Save and stop drawing
    const pos = e?.target?.getStage()?.getPointerPosition();

    const x = pos ? getSafeExitPosition(pos.x, 0, width) : undefined;
    const y = pos ? getSafeExitPosition(pos.y, 0, height) : undefined;
    const xy = [x!, y!];

    onDraw({
      ...drawingElement,
      points: xy ? drawingElement.points.concat(xy) : drawingElement.points,
    });
    setDrawingElement(undefined);

    // Listen if the user lift's their mouse up
    window.addEventListener("mouseup", mouseUpOutsideListener);
  };

  return {
    drawingElement,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleMouseDown as unknown as (
      evt: KonvaEventObject<TouchEvent>
    ) => void,
    onTouchMove: handleMouseMove as unknown as (
      evt: KonvaEventObject<TouchEvent>
    ) => void,
    onTouchEnd: handleMouseUp,
  };
};
