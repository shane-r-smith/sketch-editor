type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export const stringToClampedRgb = (digitString: string): IntRange<0, 256> => {
  const _digit = parseInt(digitString);

  if (isNaN(_digit)) {
    return 0;
  }

  return clampRgbDigit(_digit);
};

/**
 * Ensures that a given number is a valid RGB digit.
 * If the input is less than 0, returns 0.
 * If the input is greater than 255, returns 255.
 * Otherwise, returns the input unchanged.
 *
 * @param digit - The number to validate as an RGB digit.
 * @returns The validated RGB digit, clamped between 0 and 255.
 */
export const clampRgbDigit = (digit: number): IntRange<0, 256> => {
  if (digit < 0) {
    return 0;
  }

  if (digit > 255) {
    return 255;
  }

  return parseInt(`${digit}`) as IntRange<0, 256>;
};
