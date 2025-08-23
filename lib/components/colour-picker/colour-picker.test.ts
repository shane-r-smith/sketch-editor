import { describe, it, expect } from "vitest";
import { stringToClampedRgb, clampRgbDigit } from "./colour-picker.utils";

describe("clampRgbDigit", () => {
  it("returns 0 for negative numbers", () => {
    expect(clampRgbDigit(-10)).toBe(0);
    expect(clampRgbDigit(-1)).toBe(0);
  });

  it("returns 255 for numbers greater than 255", () => {
    expect(clampRgbDigit(256)).toBe(255);
    expect(clampRgbDigit(999)).toBe(255);
  });

  it("returns the number itself if between 0 and 255", () => {
    expect(clampRgbDigit(0)).toBe(0);
    expect(clampRgbDigit(128)).toBe(128);
    expect(clampRgbDigit(255)).toBe(255);
  });

  it("handles floating point numbers by truncating", () => {
    expect(clampRgbDigit(128.9)).toBe(128);
    expect(clampRgbDigit(255.7)).toBe(255);
  });
});

describe("stringToClampedRgb", () => {
  it("parses valid digit strings and clamps them", () => {
    expect(stringToClampedRgb("0")).toBe(0);
    expect(stringToClampedRgb("255")).toBe(255);
    expect(stringToClampedRgb("128")).toBe(128);
    expect(stringToClampedRgb("300")).toBe(255);
    expect(stringToClampedRgb("-20")).toBe(0);
  });

  it("returns 0 for non-numeric strings", () => {
    expect(stringToClampedRgb("abc")).toBe(0);
    expect(stringToClampedRgb("")).toBe(0);
    expect(stringToClampedRgb(" ")).toBe(0);
  });

  it("parses floating point strings and clamps them", () => {
    expect(stringToClampedRgb("128.9")).toBe(128);
    expect(stringToClampedRgb("255.7")).toBe(255);
  });
});
