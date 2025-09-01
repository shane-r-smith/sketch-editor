import { useAtomValue } from "jotai";
import { selectedToolAtom } from "../../api/tools-api";
import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const { strokeWidth } = useAtomValue(selectedToolAtom);
  // TODO: resize with zoom --- const zoom = useAtomValue(selectZoom);

  useEffect(() => {
    if (!cursor.current) {
      return;
    }

    function handle_mouse_move(e: MouseEvent) {
      if (!cursor.current) {
        return;
      }

      cursor.current.style.left = `${e.pageX}px`;
      cursor.current.style.top = `${e.pageY}px`;
    }

    document.addEventListener("mousemove", handle_mouse_move);

    return () => {
      document.removeEventListener("mousemove", handle_mouse_move);
    };
  }, [cursor]);

  return (
    <Box
      ref={cursor}
      position={"fixed"}
      left={"-6rem"}
      top={"50%"}
      sx={{
        pointerEvents: "none",
        backgroundColor: "transparent",
        border: 2,
        borderStyle: "dashed",
        borderColor: "white",
        mixBlendMode: "difference",
        borderRadius: 9999,
        zIndex: 30,
        transform: "translateX(-50%) translateY(-50%)",
      }}
      style={{
        width: `${strokeWidth * 1}px`,
        height: `${strokeWidth * 1}px`,
      }}
    />
  );
}
