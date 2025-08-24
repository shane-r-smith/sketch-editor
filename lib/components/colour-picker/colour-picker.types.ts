import type { ColourType } from "../../domain";

export interface BaseColourPickerProps {
  /**
   * The initial colour value for the colour picker.
   * This is the colour that will be displayed when the picker is first rendered.
   */
  colour: string;

  /**
   * Type of colour input to use.
   * This can be "HEX" for hexadecimal input or "RGB" for RGB input.
   */
  type: ColourType;

  /**
   * Callback function to handle colour changes.
   * This function is called when the user selects a colour.
   * @param colour The selected colour value.
   * @param type The type of colour (e.g., HEX, RGB).
   */
  onChange: (colour: string, type: ColourType) => void;
}

export interface ColourPickerHistoryProps {
  /**
   * History of colours used in the picker.
   * This is used to show the last used colours
   * and allow users to quickly select them.
   */
  history: string[];

  /**
   * Number of history items to show in the picker.
   * This is used to limit the number of items shown.
   */
  numHistoryToShow: number;

  onColourSelected: (colour: string) => void;
}

export interface ColourPickerProps
  extends BaseColourPickerProps,
    ColourPickerHistoryProps {}
