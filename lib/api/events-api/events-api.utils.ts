import { sketchStore } from "../../sketch.store";
import { sketchAtom } from "../sketch-api/sketch-api.state";
import type { EventType } from "./events-api.types";

export const subscribe: (
  event: EventType,
  listener: (this: Window, ev: CustomEventInit) => void
) => () => void = (event, listener) => {
  window.addEventListener(event, listener);

  return unsubscribe(event, listener);
};

export const unsubscribe: (
  event: EventType,
  listener: (this: Window, ev: CustomEventInit) => void
) => () => void = (event, listener) => {
  return () => {
    window.removeEventListener(event, listener);
  };
};

export const publish: (event: EventType) => void = (event) => {
  switch (event) {
    case "SKETCH":
      publishSketchChange();
      break;
  }
};

const publishSketchChange: () => void = () => {
  const sketch = sketchStore.get(sketchAtom);

  if (!sketch) {
    return;
  }

  window.dispatchEvent(new CustomEvent("SKETCH", { detail: sketch }));
};
