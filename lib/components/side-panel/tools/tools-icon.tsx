import DrawTwoToneIcon from "@mui/icons-material/DrawTwoTone";
import CleaningServicesTwoToneIcon from "@mui/icons-material/CleaningServicesTwoTone";
import type { ToolKey } from "../../../domain";
import { useAtomValue } from "jotai";
import { selectedToolKeyAtom } from "../../../api/tools-api";

export interface ToolsIconProps {
  tool: ToolKey;
}

export function ToolsIcon({ tool }: ToolsIconProps) {
  switch (tool) {
    case "PEN":
      return <DrawTwoToneIcon />;
    case "ERASER":
      return <CleaningServicesTwoToneIcon />;
  }
}

export function SelectedToolsIcon() {
  const tool = useAtomValue(selectedToolKeyAtom);

  return <ToolsIcon tool={tool} />;
}
