import type { BaseColourPickerProps } from "../colour-picker.types";

import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { ColourType } from "../../../domain";

export function ColourPickerType({
  colour,
  type,
  onChange,
  ...rest
}: BaseColourPickerProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(colour, event.target.value as ColourType);
  };

  return (
    <FormControl>
      <Select size="small" value={type} onChange={handleChange} {...rest}>
        <MenuItem value={"HEX"}>HEX</MenuItem>
        <MenuItem value={"RGB"}>RGB</MenuItem>
      </Select>
    </FormControl>
  );
}
