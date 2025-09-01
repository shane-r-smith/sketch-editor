import { useAtom } from "jotai";
import { selectedToolAtom } from "../../../../api/tools-api";
import { ColourPicker } from "../../../colour-picker";
import { publish } from "../../../../api/events-api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";

import { useState } from "react";

const ColouredSlider = styled(Slider)<{ colour: string }>((props) => ({
  color: props.colour,
  "& .MuiSlider-thumb": {
    border: "2px solid #fff",
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: props.colour,
  },
}));

export function PenOptions() {
  const [tool, setTool] = useAtom(selectedToolAtom);
  const [value, setValue] = useState(30);

  const handleSliderChange = (_event: Event, newValue: number) => {
    setTool({ strokeWidth: newValue });
    publish("TOOL");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === "" ? 1 : Number(event.target.value);

    setTool({
      strokeWidth: newValue,
    });

    publish("TOOL");
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 1000) {
      setValue(1000);
    }
  };

  if (tool.tool !== "PEN") {
    return null;
  }

  return (
    <>
      <Box py={2}>
        <Typography gutterBottom>Size</Typography>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size="grow">
            <ColouredSlider
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
                min: 0,
                max: 1000,
                type: "number",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <ColourPicker
        type={tool.strokeColourType}
        colour={tool.stroke}
        history={tool.strokeColourHistory}
        numHistoryToShow={18}
        onChange={(stroke, strokeColourType) => {
          setTool({
            stroke,
            strokeColourType,
          });

          publish("TOOL");
        }}
        onColourSelected={(stroke) => {
          setTool({
            stroke,
          });
        }}
      />
    </>
  );
}
