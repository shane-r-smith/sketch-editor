import { atom } from "jotai";
import {
  type Layer,
  type Page,
  type Sketch,
  type SketchElement,
} from "../../domain";

export const sketchAtom = atom<Sketch>();
export const currentPageIndexAtom = atom(0);
export const currentLayerIndexAtom = atom(0);

export const currentPageAtom = atom(
  (get) => {
    const sketch = get(sketchAtom);
    const pageIndex = get(currentPageIndexAtom);

    return sketch?.pages[pageIndex];
  },
  (get, set, newPage: Partial<Page>) => {
    const sketch = get(sketchAtom);

    if (!sketch) {
      // no sketch to update
      return;
    }

    const updated = structuredClone(sketch);

    updated.pages = sketch.pages.map<Page>((page) => {
      if (page.id === newPage.id) {
        return { ...page, ...newPage };
      }

      return page;
    });

    set(sketchAtom, updated);
  }
);

export const currentLayersAtom = atom((get) => {
  const page = get(currentPageAtom);
  return page?.layers;
});

export const currentLayerAtom = atom(
  (get) => {
    const page = get(currentPageAtom);
    const layerIndex = get(currentLayerIndexAtom);

    return page?.layers[layerIndex];
  },
  (get, set, newLayer: Partial<Layer>) => {
    const page = get(currentPageAtom);

    if (!page || !newLayer.id) {
      // no page to update
      return;
    }

    page.layers = page.layers.map<Layer>((layer: Layer) => {
      if (layer.id === newLayer.id && newLayer.id !== undefined) {
        return { ...layer, ...newLayer } as Layer;
      }

      return layer;
    });

    set(currentPageAtom, page);
  }
);

export const addElementAtom = atom(
  null,
  (get, set, newElement: SketchElement) => {
    const currentLayer = get(currentLayerAtom);

    if (!currentLayer) {
      // no current layer to update
      return;
    }

    currentLayer.elements = [
      ...currentLayer.elements,
      normaliseElement(newElement),
    ];

    set(currentLayerAtom, currentLayer);
  }
);

function normaliseElement(element: SketchElement): SketchElement {
  if (element.tool === "PEN") {
    delete (element as unknown as { strokeColourHistory: unknown })
      .strokeColourHistory;
  }

  delete (element as unknown as { icon: unknown }).icon;

  return element;
}
