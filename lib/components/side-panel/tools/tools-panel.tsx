import { Box, IconButton, Typography } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedToolAtom,
  selectedToolKeyAtom,
  toolsAtom,
} from "../../../api/tools-api";
import { publish } from "../../../api/events-api";
import { ToolOptions } from "./options";
import { ToolsIcon } from "./tools-icon";

export function ToolsPanel() {
  const selectedTool = useAtomValue(selectedToolAtom);
  const setToolKey = useSetAtom(selectedToolKeyAtom);
  const tools = useAtomValue(toolsAtom);

  return (
    <Box p={2}>
      <Box p={2}>
        <Typography variant="h6">Tools</Typography>
        <div>
          {Object.values(tools).map(({ tool }) => {
            return (
              <IconButton
                key={`tool-${tool}`}
                aria-label={tool}
                color={selectedTool.tool === tool ? "primary" : "default"}
                onClick={() => {
                  setToolKey(tool);
                  publish("TOOL");
                }}
                size="large"
              >
                <ToolsIcon tool={tool} />
              </IconButton>
            );
          })}
        </div>
      </Box>
      <Box p={2}>
        <Typography variant="h6">Options</Typography>
        <ToolOptions />
      </Box>
    </Box>
  );
}
