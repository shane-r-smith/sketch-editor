import type { BaseColourPickerProps } from "../colour-picker.types";
import { HexColourInput } from "./hex-colour-input";
import { RgbColourInput } from "./rgb-colour-input";

export function ColourInput({ type, ...rest }: BaseColourPickerProps) {
  if (type === "RGB") {
    return <RgbColourInput {...rest} type={type} />;
  }

  return <HexColourInput {...rest} type={type} />;
}
