import "./App.css";

import {
  Sketch,
  SketchApi,
  Workspace,
  SketchProvider,
  SketchEditor,
  SidePanel,
  WorkspaceWrapper,
} from "../lib/main";
import { useEffect, useRef, useState } from "react";

function App() {
  const sketchApi = useRef(new SketchApi());

  const [timeout, setCurrentTimeout] = useState<boolean>();

  useEffect(() => {
    sketchApi.current.load(new Sketch("Test Sketch", [1000, 1000], 12));
  }, []);

  useEffect(() => {
    const requestSave = (sketch: Sketch) => {
      // if save is already requested - do nothing
      if (timeout) {
        return;
      }

      setCurrentTimeout(true);

      // Call the save function
      console.log("Auto saving sketch...", sketch);

      setCurrentTimeout(false);
    };

    // Request saving operation on any changes
    const off = sketchApi.current.on("SKETCH", (e: CustomEventInit<Sketch>) => {
      //TODO: Save changes only.
      if (!e.detail) {
        return;
      }

      requestSave(e.detail);
    });

    return () => {
      off();
    };
  }, [timeout]);

  return (
    <div className="App">
      <SketchProvider>
        <SketchEditor>
          <SidePanel />
          <WorkspaceWrapper>
            <Workspace />
          </WorkspaceWrapper>
        </SketchEditor>
      </SketchProvider>
    </div>
  );
}

export default App;
