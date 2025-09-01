import { atom } from "jotai";
import type { Tool } from "../../domain";

import DrawTwoToneIcon from "@mui/icons-material/DrawTwoTone";

export const toolAtom = atom<Tool>({
  tool: "PEN",
  icon: <DrawTwoToneIcon />,
  stroke: "#000",
  strokeWidth: 10,
  strokeColourType: "HEX",
  strokeColourHistory: [],
});
