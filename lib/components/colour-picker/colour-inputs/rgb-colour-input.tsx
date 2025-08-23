import TextField from "@mui/material/TextField";
import type { BaseColourPickerProps } from "../colour-picker.types";
import { colord } from "colord";
import { useCallback, useEffect, useId, useState } from "react";
import { stringToClampedRgb } from "../colour-picker.utils";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import { Stack } from "@mui/material";

export function RgbColourInput({
  colour,
  type,
  onChange,
  ...rest
}: BaseColourPickerProps) {
  const [currentColour, setCurrentColour] = useState(colord(colour).toRgb());

  const redId = useId();
  const greenId = useId();
  const blueId = useId();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const isRed = event.target.id === redId;
        const isGreen = event.target.id === greenId;
        const isBlue = event.target.id === blueId;

        const newValue = stringToClampedRgb(event.target.value);

        const updatedColour = structuredClone(currentColour);

        if (isRed) {
          updatedColour.r = newValue;
        }

        if (isGreen) {
          updatedColour.g = newValue;
        }

        if (isBlue) {
          updatedColour.b = newValue;
        }

        setCurrentColour(updatedColour);
        onChange(colord(updatedColour).toRgbString(), type);
      } catch {
        // adsorb any errors
      }
    },
    [blueId, currentColour, greenId, onChange, redId, type]
  );

  useEffect(() => {
    try {
      const updatedColour = colord(currentColour).toRgbString();
      if (updatedColour === colord(colour).toRgbString()) {
        return;
      }

      const value = colord(colour);

      if (value.isValid()) {
        setCurrentColour(value.toRgb());
        return;
      }

      setCurrentColour({ r: 0, g: 0, b: 0, a: 1 });
    } catch {
      // adsorb any errors
    }
  }, [colour, currentColour, onChange, type]);

  return (
    <Grid container spacing={0.5} columns={3}>
      <Stack>
        <FormLabel className="absolute -top-6 text-sm font-medium">R</FormLabel>
        <TextField
          {...rest}
          id={redId}
          value={currentColour.r}
          onChange={handleChange}
          slotProps={{
            htmlInput: {
              type: "number",
              min: 0,
              max: 255,
            },
          }}
          name="red"
          size="small"
        />
      </Stack>
      <Stack>
        <FormLabel className="absolute -top-5">G</FormLabel>
        <TextField
          {...rest}
          id={greenId}
          value={currentColour.g}
          onChange={handleChange}
          slotProps={{
            htmlInput: {
              type: "number",
              min: 0,
              max: 255,
            },
          }}
          name="green"
          size="small"
        />
      </Stack>
      <Stack>
        <FormLabel className="absolute -top-5">B</FormLabel>
        <TextField
          {...rest}
          id={blueId}
          value={currentColour.b}
          onChange={handleChange}
          slotProps={{
            htmlInput: {
              type: "number",
              min: 0,
              max: 255,
            },
          }}
          name="blue"
          size="small"
        />
      </Stack>
    </Grid>
  );
}
