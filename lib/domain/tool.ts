import type { ColourType } from "./colour";

export type ToolKey = "PEN" | "ERASER";

/**
 * Represents the base properties shared by all drawing tools.
 *
 * @property key - Unique identifier for the tool.
 * @property stroke - The points.
 * @property strokeWidth - The width of the tool's stroke.
 */
export interface BaseTool {
  key: ToolKey;
  stroke: string;
  strokeWidth: number;
}

/**
 * Represents a tool with an associated stroke colour and history.
 *
 * @property strokeType - The type of colour used for the stroke.
 * @property strokeHistory - An array of strings representing the history of stroke colours.
 */
export interface ToolWithColour {
  strokeType: ColourType;
  strokeHistory: string[];
}

/** TOOLS */

/**
 * Represents the pen tool used in the sketch editor.
 * Extends the {@link BaseTool} and includes {@link ToolWithColour}.
 *
 * @property key - The unique identifier for the pen tool ("PEN").
 * @property strokeWidth - The width of the pen stroke.
 */
export interface PenTool extends BaseTool, ToolWithColour {
  key: "PEN";
}

/**
 * Represents the eraser tool used in the sketch editor.
 * Extends {@link BaseTool} and provides additional properties specific to erasing functionality.
 *
 * @property key - The unique identifier for the eraser tool, always "ERASER".
 * @property strokeWidth - The width of the eraser stroke in pixels.
 */
export interface EraserTool extends BaseTool {
  key: "ERASER";
}
