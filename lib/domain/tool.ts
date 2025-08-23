import type { ColourType } from "./colour";
import type { ReactNode } from "react";

/** Represents the unique keys for different drawing tools. */
export type ToolKey = "PEN" | "ERASER";

/**
 * Represents the base properties shared by all drawing tools.
 */
export interface BaseTool {
  /** Identifier for the tool. */
  tool: ToolKey;

  /** The icon displayed for the tool. */
  icon: ReactNode;

  /** The points */
  stroke: string;

  /** The width of the pen stroke. */
  strokeWidth: number;
}

/**
 * Represents a tool with an associated stroke colour and history.
 */
export interface ToolWithColour {
  /** The type of colour used for the stroke. */
  strokeColourType: ColourType;

  /** An array of strings representing the history of stroke colours. */
  strokeColourHistory: string[];
}

/** TOOLS */

/**
 * Represents the pen tool used in the sketch editor.
 * Extends the {@link BaseTool} and includes {@link ToolWithColour}.
 */
export interface PenTool extends BaseTool, ToolWithColour {
  /** The unique identifier for the pen tool */
  tool: "PEN";
}

/**
 * Represents the eraser tool used in the sketch editor.
 * Extends {@link BaseTool} and provides additional properties specific to erasing functionality.
 */
export interface EraserTool extends BaseTool {
  /** The unique identifier for the eraser tool */
  tool: "ERASER";
}
