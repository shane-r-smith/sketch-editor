import { useCallback, useEffect, useState } from "react";
import type { BaseColourPickerProps } from "../colour-picker.types";
import { colord } from "colord";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";

export function HexColourInput({
  type,
  colour,
  onChange,
  ...rest
}: BaseColourPickerProps) {
  const [currentColour, setCurrentColour] = useState(colord(colour).toHex());

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentColour(event.target.value);
      onChange(event.target.value, type);
    },
    [onChange, type]
  );

  useEffect(() => {
    if (currentColour === colour) {
      return;
    }

    const value = colord(colour);

    if (value.isValid()) {
      setCurrentColour(value.toHex());
      return;
    }

    setCurrentColour(colour);
    return;
  }, [colour, currentColour]);

  return (
    <Stack>
      <FormLabel>HEX</FormLabel>
      <TextField
        {...rest}
        value={currentColour}
        onChange={handleChange}
        size="small"
      />
    </Stack>
  );
}
