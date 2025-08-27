import { Provider } from "jotai";
import { type PropsWithChildren } from "react";
import { sketchStore } from "../../sketch.store";

export function SketchProvider({ children }: PropsWithChildren) {
  return <Provider store={sketchStore}>{children}</Provider>;
}
