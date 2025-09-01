import { atom } from "jotai";
import type { Tool, ToolKey } from "../../domain";

import type { Dictionary } from "../../domain/dictionary";

export const selectedToolKeyAtom = atom<ToolKey>("PEN");

export const toolsAtom = atom<Dictionary<ToolKey, Tool>>({
  PEN: {
    tool: "PEN",
    stroke: "#000",
    strokeWidth: 10,
    strokeColourType: "HEX",
    strokeColourHistory: [],
  },
  ERASER: {
    tool: "ERASER",
    stroke: "#000",
    strokeWidth: 10,
  },
});

export const selectedToolAtom = atom(
  (get) => {
    const toolKey = get(selectedToolKeyAtom);
    const tools = get(toolsAtom);

    return tools[toolKey];
  },
  (get, set, newTool: Partial<Tool>) => {
    const toolKey = get(selectedToolKeyAtom);
    const tools = get(toolsAtom);

    const updated = structuredClone(tools);

    const updatedTool = {
      ...tools[toolKey],
      ...newTool,
    } as Tool;

    updated[toolKey] = updatedTool;

    set(toolsAtom, updated);
  }
);
