import { useAtomValue } from "jotai";
import { selectedToolKeyAtom } from "../../../../api/tools-api";
import { PenOptions } from "./pen-options";
import { EraserOptions } from "./eraser-options";

export function ToolOptions() {
  const selectedToolKey = useAtomValue(selectedToolKeyAtom);

  switch (selectedToolKey) {
    case "PEN":
      return <PenOptions />;
    case "ERASER":
      return <EraserOptions />;
    default:
      return null;
  }
}
