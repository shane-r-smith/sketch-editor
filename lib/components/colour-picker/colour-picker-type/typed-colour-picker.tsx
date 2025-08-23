import { HexColorPicker, RgbStringColorPicker } from "react-colorful";
import type { BaseColourPickerProps } from "../colour-picker.types";
import { useCallback } from "react";
import { colord } from "colord";

import styles from "./typed-colour-picker.styles.module.scss";

export function TypedColourPicker({
  type,
  colour,
  onChange,
  ...rest
}: BaseColourPickerProps) {
  const handleChange = useCallback(
    (colour: string) => {
      onChange(colour, type);
    },
    [onChange, type]
  );

  const _className = styles.editorColourPicker;

  if (type === "RGB") {
    return (
      <RgbStringColorPicker
        className={_className}
        onChange={handleChange}
        color={colord(colour).toRgbString()}
        {...rest}
      />
    );
  }

  return (
    <HexColorPicker
      className={_className}
      color={colord(colour).toHex()}
      onChange={handleChange}
      {...rest}
    />
  );
}
