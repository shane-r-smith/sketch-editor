import { useAtomValue } from "jotai";
import { sketchAtom } from "../../api/sketch.state";

export function Workspace({ ...rest }) {
  const sketch = useAtomValue(sketchAtom);

  // const layers = useAppSelector(selectLayers);
  // const layer = useAppSelector(selectLayer);
  // const pageIndex = useAppSelector(selectPageIndex);
  // const layerIndex = useAppSelector(selectLayerIndex);

  // const [showCursor, setShowCursor] = useState(false); // initiate it at false
  // const [loaded, setLoaded] = useState(false);

  // const tool = useAppSelector(selectTool);
  // const canvasRef = useRef<Stage>(null);
  // const zoomRef = useRef(null);

  // useEffect(() => {
  //   if (loaded) {
  //     return;
  //   }

  //   if (!sketch || !layers || !layer) {
  //     return;
  //   }

  //   setLoaded(true);
  // }, [loaded, sketch, layers, layer]);

  // const _handleDraw = (element: EditorElement) => {
  //   // add to store
  //   dispatch(addElement({ element, pageIndex, layerIndex }));

  //   // call editor change events
  //   publish("change");

  //   // Update stroke history
  //   if ("strokeHistory" in tool) {
  //     dispatch(updateStrokeHistory(element.stroke));
  //     publish("tool-change");
  //   }
  // };

  // const _handleDrawing = (drawingState: DrawingState) => {
  //   dispatch(updateDrawingState(drawingState));
  // };

  // if (!loaded || !flipbook || !layers || !layer) {
  //   return null;
  // }

  // return (
  //   <div
  //     className={"flipbook-canvas w-full h-full overflow-auto	bg-gray-200"}
  //     onMouseEnter={() => {
  //       setShowCursor(true);
  //     }}
  //     onMouseLeave={() => {
  //       setShowCursor(false);
  //     }}
  //     {...rest}
  //   >
  //     {showCursor ? <Cursor /> : null}
  //     <div
  //       ref={zoomRef}
  //       role="presentation"
  //       className="flipbook-canvas-container w-full h-full flex justify-center items-center overflow-hidden bg-gray-200"
  //     >
  //       <DrawableCanvas
  //         ref={canvasRef}
  //         tool={tool}
  //         layers={layers}
  //         onionSkinningLayers={onionSkinningLayers}
  //         selectedLayerIndex={layer.index}
  //         disabled={!layer.visible || layer.locked}
  //         onDraw={_handleDraw}
  //         onDrawing={_handleDrawing}
  //         width={flipbook.size[0]}
  //         height={flipbook.size[1]}
  //         className="bg-white border border-solid border-gray-500"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div {...rest}>
      <pre>{JSON.stringify(sketch, undefined, 2)}</pre>
    </div>
  );
}
