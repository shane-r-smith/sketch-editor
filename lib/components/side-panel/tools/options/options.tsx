import { useAtomValue } from "jotai";
import { selectedToolKeyAtom } from "../../../../api/tools-api";
import { PenOptions } from "./pen-options";

export function ToolOptions() {
  const selectedToolKey = useAtomValue(selectedToolKeyAtom);

  switch (selectedToolKey) {
    case "PEN":
      return <PenOptions />;
    case "ERASER":
      return null;
    // return <EraserOptions />;
    default:
      return null;
  }
}
