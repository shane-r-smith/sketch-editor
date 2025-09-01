import { useAtom } from "jotai";
import { selectedToolAtom } from "../../../../api/tools-api";
import { publish } from "../../../../api/events-api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import { useCallback } from "react";

export function EraserOptions() {
  const [tool, setTool] = useAtom(selectedToolAtom);

  const handleSliderChange = useCallback(
    (_event: Event, strokeWidth: number) => {
      setTool({ strokeWidth });
      publish("TOOL");
    },
    [setTool]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue =
        event.target.value === "" ? 1 : Number(event.target.value);

      setTool({
        strokeWidth: newValue,
      });

      publish("TOOL");
    },
    [setTool]
  );

  const handleBlur = useCallback(() => {
    if (tool.strokeWidth < 1) {
      setTool({ strokeWidth: 1 });
    } else if (tool.strokeWidth > 1000) {
      setTool({ strokeWidth: 1000 });
    }
  }, [setTool, tool.strokeWidth]);

  if (tool.tool !== "ERASER") {
    return null;
  }

  return (
    <Box py={2}>
      <Typography gutterBottom>Size</Typography>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid size="grow">
          <Slider
            min={1}
            max={1000}
            value={tool.strokeWidth}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            colour={tool.stroke}
          />
        </Grid>
        <Grid>
          <Input
            value={tool.strokeWidth}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 1,
              max: 1000,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
