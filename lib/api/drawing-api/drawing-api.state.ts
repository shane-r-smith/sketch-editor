import { atom } from "jotai";
import type { DrawingState } from "../../domain";

export const drawingAtom = atom<DrawingState>({
  isDrawing: false,
  hasLeftCanvasWhileDrawing: false,
});
