import { type ColourPickerProps } from "./colour-picker.types";
import { TypedColourPicker } from "./colour-picker-type/typed-colour-picker";
import { ColourPickerType } from "./colour-picker-type/colour-picker-type";
import { ColourInput } from "./colour-inputs/colour-input";
import ColourPickerHistory from "./colour-picker-history";
import Grid from "@mui/material/Grid";

export function ColourPicker({
  colour,
  type,
  history,
  numHistoryToShow,
  onColourSelected,
  onChange,
}: ColourPickerProps) {
  return (
    <Grid container direction="column" spacing={2}>
      <TypedColourPicker colour={colour} type={type} onChange={onChange} />
      <ColourPickerType colour={colour} type={type} onChange={onChange} />
      <ColourInput colour={colour} type={type} onChange={onChange} />
      <ColourPickerHistory
        history={history}
        numHistoryToShow={numHistoryToShow}
        onColourSelected={onColourSelected}
      />
    </Grid>
  );
}
